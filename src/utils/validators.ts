/**
 * Validators for form inputs and data
 */

export const validators = {
  /**
   * Validate a non-empty string
   */
  required: (value: string): boolean => {
    return value.trim().length > 0
  },

  /**
   * Validate minimum length
   */
  minLength: (value: string, min: number): boolean => {
    return value.length >= min
  },

  /**
   * Validate maximum length
   */
  maxLength: (value: string, max: number): boolean => {
    return value.length <= max
  },

  /**
   * Validate email format
   */
  email: (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  },

  /**
   * Validate URL format
   */
  url: (value: string): boolean => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  },

  /**
   * Validate positive number
   */
  positiveNumber: (value: number): boolean => {
    return value > 0
  },

  /**
   * Validate integer
   */
  integer: (value: number): boolean => {
    return Number.isInteger(value)
  },
}
