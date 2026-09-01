import { useEffect, useState } from 'react'
import { Joke } from '@/types'
import { jokeService } from '@/api/jokeService'
import { useJokeStore } from '@/store/jokeStore'
import { API_CONFIG } from '@/constants'

interface UseJokeOptions {
  category?: string
  retries?: number
}

export const useJoke = (options: UseJokeOptions = {}) => {
  const { category, retries = API_CONFIG.MAX_RETRIES } = options
  const {
    setCurrentJoke,
    setLoading,
    setError,
    addToHistory,
    updateStatistics,
  } = useJokeStore()
  const [joke, setJoke] = useState<Joke | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setErrorState] = useState<string | null>(null)
  const [responseTime, setResponseTime] = useState(0)

  const fetchJoke = async (selectedCategory?: string) => {
    setIsLoading(true)
    setLoading(true)
    setErrorState(null)
    setError(null)

    const startTime = performance.now()

    try {
      const newJoke = await jokeService.getRandomJoke(selectedCategory || category)
      const endTime = performance.now()
      const time = endTime - startTime

      setJoke(newJoke)
      setCurrentJoke(newJoke)
      addToHistory(newJoke)

      updateStatistics({
        lastFetchedAt: new Date().toISOString(),
        averageResponseTime: time,
      })

      setResponseTime(time)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch joke'
      setErrorState(errorMessage)
      setError(errorMessage)
    } finally {
      setIsLoading(false)
      setLoading(false)
    }
  }

  return {
    joke,
    isLoading,
    error,
    responseTime,
    fetchJoke,
  }
}

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue, removeValue] as const
}

export const useTheme = () => {
  const { theme, setTheme, toggleTheme } = useJokeStore()

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  return { theme, setTheme, toggleTheme }
}

export const useAsync = <T, E = Error>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [value, setValue] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)

  const execute = async () => {
    setStatus('pending')
    setValue(null)
    setError(null)
    try {
      const response = await asyncFunction()
      setValue(response)
      setStatus('success')
      return response
    } catch (error) {
      setError(error as E)
      setStatus('error')
      throw error
    }
  }

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [])

  return { execute, status, value, error }
}
