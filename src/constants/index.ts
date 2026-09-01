/**
 * Application constants
 */

export const APP_NAME = 'Joke Generator'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'Generate random jokes and save your favorites'

// Joke Categories
export const JOKE_CATEGORIES = [
  { id: 'any', name: 'any', label: 'Any', icon: '😂' },
  { id: 'programming', name: 'Programming', label: 'Programming', icon: '💻' },
  { id: 'knock-knock', name: 'Knock-knock', label: 'Knock-knock', icon: '🚪' },
  { id: 'general', name: 'General', label: 'General', icon: '😄' },
  { id: 'pun', name: 'Pun', label: 'Pun', icon: '🎭' },
  { id: 'spooky', name: 'Spooky', label: 'Spooky', icon: '👻' },
  { id: 'christmas', name: 'Christmas', label: 'Christmas', icon: '🎄' },
] as const

// API Configuration
export const API_CONFIG = {
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  MAX_RETRIES: parseInt(import.meta.env.VITE_MAX_RETRIES || '3'),
  RETRY_DELAY: 1000,
}

export const JOKE_API_URL = import.meta.env.VITE_JOKE_API_URL || 'https://jokeapi.dev/api/joke'
export const OFFICIAL_JOKE_API_URL =
  import.meta.env.VITE_OFFICIAL_JOKE_API_URL || 'https://official-joke-api.appspot.com'

// Local Storage Keys
export const STORAGE_KEYS = {
  FAVORITES: 'joke-generator:favorites',
  STATISTICS: 'joke-generator:statistics',
  HISTORY: 'joke-generator:history',
  THEME: 'joke-generator:theme',
  LAST_CATEGORY: 'joke-generator:last-category',
} as const

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Failed to fetch joke. Please check your internet connection.',
  API_ERROR: 'API returned an error. Please try again.',
  NO_RESULTS: 'No jokes found for this category.',
  STORAGE_ERROR: 'Failed to access local storage.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  ADDED_TO_FAVORITES: 'Added to favorites!',
  REMOVED_FROM_FAVORITES: 'Removed from favorites!',
  CLEARED_FAVORITES: 'All favorites cleared!',
  EXPORTED_FAVORITES: 'Favorites exported successfully!',
} as const

// Themes
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const

// Animation durations (ms)
export const ANIMATION = {
  FADE_IN: 300,
  SLIDE_UP: 300,
  TRANSITION: 200,
} as const
