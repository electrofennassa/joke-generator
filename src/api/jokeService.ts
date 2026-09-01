import axios, { AxiosInstance } from 'axios'
import { Joke, JokeApiResponse, OfficialJokeResponse } from '@/types'
import { JOKE_API_URL, OFFICIAL_JOKE_API_URL, API_CONFIG } from '@/constants'
import { generateId, retryWithBackoff } from '@/utils'

class JokeService {
  private jokeApiClient: AxiosInstance
  private officialApiClient: AxiosInstance

  constructor() {
    this.jokeApiClient = axios.create({
      baseURL: JOKE_API_URL,
      timeout: API_CONFIG.TIMEOUT,
    })

    this.officialApiClient = axios.create({
      baseURL: OFFICIAL_JOKE_API_URL,
      timeout: API_CONFIG.TIMEOUT,
    })
  }

  /**
   * Get a random joke from JokeAPI
   */
  private async getFromJokeAPI(category = 'any'): Promise<Joke> {
    const response = await this.jokeApiClient.get<JokeApiResponse>('/', {
      params: {
        type: 'twopart',
        category: category === 'any' ? 'any' : category,
      },
    })

    if (response.data.error) {
      throw new Error('Failed to fetch joke from JokeAPI')
    }

    return {
      id: generateId(),
      setup: response.data.setup || '',
      delivery: response.data.delivery || '',
      category: response.data.category,
      type: response.data.type,
      source: 'jokeapi',
      createdAt: new Date().toISOString(),
    }
  }

  /**
   * Get a random joke from Official Joke API
   */
  private async getFromOfficialAPI(): Promise<Joke> {
    const response = await this.officialApiClient.get<OfficialJokeResponse>(
      '/random_joke'
    )

    return {
      id: generateId(),
      setup: response.data.setup,
      delivery: response.data.punchline,
      category: 'general',
      type: 'twopart',
      source: 'official',
      createdAt: new Date().toISOString(),
    }
  }

  /**
   * Get a random joke from any source
   */
  async getRandomJoke(category = 'any'): Promise<Joke> {
    const apis = [() => this.getFromJokeAPI(category), () => this.getFromOfficialAPI()]

    // Try each API with retry logic
    for (const api of apis) {
      try {
        return await retryWithBackoff(api, API_CONFIG.MAX_RETRIES, API_CONFIG.RETRY_DELAY)
      } catch (error) {
        console.error('API failed:', error)
        continue
      }
    }

    throw new Error('All joke APIs are unavailable. Please try again later.')
  }

  /**
   * Get jokes by category
   */
  async getJokesByCategory(category: string): Promise<Joke[]> {
    const jokes: Joke[] = []
    for (let i = 0; i < 3; i++) {
      try {
        const joke = await this.getRandomJoke(category)
        jokes.push(joke)
      } catch (error) {
        console.error('Failed to fetch joke:', error)
      }
    }
    return jokes
  }

  /**
   * Health check for API
   */
  async healthCheck(): Promise<boolean> {
    try {
      await Promise.race([
        this.jokeApiClient.get('/'),
        this.officialApiClient.get('/'),
      ])
      return true
    } catch {
      return false
    }
  }
}

export const jokeService = new JokeService()
