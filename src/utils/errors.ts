/**
 * API error handling
 */

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public retryable: boolean = false
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Handle API errors
 */
export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error
  }

  if (error instanceof Error) {
    const message = error.message || 'An unknown error occurred'
    return new ApiError(500, message, true)
  }

  return new ApiError(500, 'An unknown error occurred', true)
}

/**
 * Retry logic with exponential backoff
 */
export const retryWithBackoff = async <T,>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> => {
  let lastError: Error | null = null

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      if (i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}
