import create from 'zustand'
import { persist } from 'zustand/middleware'
import { Joke, Favorite, JokeStatistics } from '@/types'
import { STORAGE_KEYS } from '@/constants'

interface JokeStore {
  // State
  currentJoke: Joke | null
  favorites: Favorite[]
  statistics: JokeStatistics
  selectedCategory: string | null
  isLoading: boolean
  error: string | null
  theme: 'light' | 'dark'
  viewHistory: Joke[]

  // Actions
  setCurrentJoke: (joke: Joke | null) => void
  addFavorite: (joke: Joke) => void
  removeFavorite: (jokeId: string) => void
  clearFavorites: () => void
  isFavorite: (jokeId: string) => boolean
  setSelectedCategory: (category: string | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
  updateStatistics: (stats: Partial<JokeStatistics>) => void
  addToHistory: (joke: Joke) => void
  clearHistory: () => void
  getFavoritesCount: () => number
  getHistoryCount: () => number
}

const defaultStatistics: JokeStatistics = {
  totalViewed: 0,
  totalFavorites: 0,
  lastFetchedAt: new Date().toISOString(),
  averageResponseTime: 0,
  mostUsedCategory: null,
}

export const useJokeStore = create<JokeStore>(
  persist(
    (set, get) => ({
      // Initial state
      currentJoke: null,
      favorites: [],
      statistics: defaultStatistics,
      selectedCategory: null,
      isLoading: false,
      error: null,
      theme: 'light',
      viewHistory: [],

      // Actions
      setCurrentJoke: (joke) => set({ currentJoke: joke }),

      addFavorite: (joke) =>
        set((state) => {
          const isFavorited = state.favorites.some((fav) => fav.id === joke.id)
          if (isFavorited) return state

          const favorite: Favorite = {
            ...joke,
            favoritedAt: new Date().toISOString(),
          }

          return {
            favorites: [...state.favorites, favorite],
            statistics: {
              ...state.statistics,
              totalFavorites: state.statistics.totalFavorites + 1,
            },
          }
        }),

      removeFavorite: (jokeId) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== jokeId),
          statistics: {
            ...state.statistics,
            totalFavorites: Math.max(0, state.statistics.totalFavorites - 1),
          },
        })),

      clearFavorites: () =>
        set({
          favorites: [],
          statistics: { ...defaultStatistics, mostUsedCategory: get().statistics.mostUsedCategory },
        }),

      isFavorite: (jokeId) => get().favorites.some((fav) => fav.id === jokeId),

      setSelectedCategory: (category) => set({ selectedCategory: category }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      setTheme: (theme) => set({ theme }),

      updateStatistics: (stats) =>
        set((state) => ({
          statistics: { ...state.statistics, ...stats },
        })),

      addToHistory: (joke) =>
        set((state) => ({
          viewHistory: [
            { ...joke },
            ...state.viewHistory.filter((h) => h.id !== joke.id),
          ].slice(0, 50),
          statistics: {
            ...state.statistics,
            totalViewed: state.statistics.totalViewed + 1,
          },
        })),

      clearHistory: () =>
        set({
          viewHistory: [],
        }),

      getFavoritesCount: () => get().favorites.length,

      getHistoryCount: () => get().viewHistory.length,
    }),
    {
      name: STORAGE_KEYS.FAVORITES,
      partialize: (state) => ({
        favorites: state.favorites,
        statistics: state.statistics,
        selectedCategory: state.selectedCategory,
        theme: state.theme,
        viewHistory: state.viewHistory,
      }),
    }
  )
)
