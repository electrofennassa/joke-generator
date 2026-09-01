/**
 * Types for the Joke Generator application
 */

export interface Joke {
  id: string
  setup: string
  delivery: string
  category?: string
  type?: 'single' | 'twopart'
  source: 'jokeapi' | 'official' | 'facts'
  createdAt: string
}

export interface SimplifiedJoke {
  id: string
  joke: string
  category?: string
  source: 'jokeapi' | 'official' | 'facts'
  createdAt: string
}

export interface Favorite extends Joke {
  favoritedAt: string
}

export interface JokeStatistics {
  totalViewed: number
  totalFavorites: number
  lastFetchedAt: string
  averageResponseTime: number
  mostUsedCategory: string | null
}

export interface JokeCategory {
  id: string
  name: string
  label: string
  icon: string
}

export interface JokeApiResponse {
  error: boolean
  category: string
  type: 'single' | 'twopart'
  joke?: string
  setup?: string
  delivery?: string
}

export interface OfficialJokeResponse {
  id: number
  type: string
  setup: string
  punchline: string
}

export interface AppState {
  currentJoke: Joke | null
  favorites: Favorite[]
  statistics: JokeStatistics
  selectedCategory: string | null
  isLoading: boolean
  error: string | null
  theme: 'light' | 'dark'
}
