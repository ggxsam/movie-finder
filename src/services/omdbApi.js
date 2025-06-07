/**
 * OMDB API Service
 * Handles all movie search and data fetching from the OMDB API
 */

const API_BASE_URL = 'https://www.omdbapi.com/'
const API_KEY = import.meta.env.VITE_OMDB_API_KEY

/**
 * Custom error class for API errors
 */
class OMDBError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'OMDBError'
    this.status = status
  }
}

/**
 * Search for movies by title
 * @param {string} searchQuery - The movie title to search for
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise<Object>} Search results from OMDB API
 */
export const searchMovies = async (searchQuery, page = 1) => {
  if (!searchQuery || typeof searchQuery !== 'string' || searchQuery.trim().length === 0) {
    throw new OMDBError('Please enter a movie title to search')
  }

  if (!API_KEY) {
    throw new OMDBError('API key is not configured. Please check your environment variables.')
  }

  const trimmedQuery = searchQuery.trim()
  
  try {
    const url = new URL(API_BASE_URL)
    url.searchParams.append('apikey', API_KEY)
    url.searchParams.append('s', trimmedQuery)
    url.searchParams.append('type', 'movie')
    url.searchParams.append('page', page.toString())

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new OMDBError(`Network error: ${response.status} ${response.statusText}`, response.status)
    }

    const data = await response.json()

    if (data.Response === 'False') {
      if (data.Error === 'Movie not found!') {
        return {
          Search: [],
          totalResults: '0',
          Response: 'True'
        }
      }
      throw new OMDBError(data.Error || 'An error occurred while searching for movies')
    }

    return data
  } catch (error) {
    if (error instanceof OMDBError) {
      throw error
    }

    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new OMDBError('Network error: Please check your internet connection')
    }

    throw new OMDBError('An unexpected error occurred while searching for movies')
  }
}

/**
 * Get detailed information about a specific movie by IMDb ID
 * @param {string} imdbID - The IMDb ID of the movie
 * @returns {Promise<Object>} Detailed movie information
 */
export const getMovieDetails = async (imdbID) => {
  if (!imdbID || typeof imdbID !== 'string') {
    throw new OMDBError('Valid IMDb ID is required')
  }

  if (!API_KEY) {
    throw new OMDBError('API key is not configured. Please check your environment variables.')
  }

  try {
    const url = new URL(API_BASE_URL)
    url.searchParams.append('apikey', API_KEY)
    url.searchParams.append('i', imdbID)
    url.searchParams.append('plot', 'full')

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new OMDBError(`Network error: ${response.status} ${response.statusText}`, response.status)
    }

    const data = await response.json()

    if (data.Response === 'False') {
      throw new OMDBError(data.Error || 'Movie details not found')
    }

    return data
  } catch (error) {
    if (error instanceof OMDBError) {
      throw error
    }

    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new OMDBError('Network error: Please check your internet connection')
    }

    throw new OMDBError('An unexpected error occurred while fetching movie details')
  }
} 