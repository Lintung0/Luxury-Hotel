// src/context/constants.js
// Constants dan utility functions untuk contexts

// Auth constants
export const AUTH_STORAGE_KEY = 'token'

// Theme constants  
export const THEME_STORAGE_KEY = 'theme'
export const DEFAULT_THEME = 'dark'

// Utility functions
export const getStoredValue = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export const setStoredValue = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error storing value:', error)
  }
}