import { useState, useCallback } from 'react'
import { searchMovies } from '../services/omdbApi'

/**
 * Custom hook for managing movie search functionality
 * @returns {Object} Search state and functions
 */
export const useMovieSearch = () => {
  const [searchState, setSearchState] = useState({
    movies: [],
    searchQuery: '',
    loading: false,
    error: null,
    hasSearched: false
  })

  /**
   * Perform movie search
   * @param {string} query - Search query
   */
  const performSearch = useCallback(async (query) => {
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      setSearchState(prev => ({
        ...prev,
        error: 'Please enter a movie title to search',
        loading: false
      }))
      return
    }

    const trimmedQuery = query.trim()
    
    setSearchState(prev => ({
      ...prev,
      loading: true,
      error: null,
      searchQuery: trimmedQuery,
      hasSearched: true
    }))

    try {
      const data = await searchMovies(trimmedQuery)
      
      setSearchState(prev => ({
        ...prev,
        movies: data.Search || [],
        loading: false,
        error: null
      }))
    } catch (error) {
      console.error('Search error:', error)
      
      setSearchState(prev => ({
        ...prev,
        movies: [],
        loading: false,
        error: error.message || 'An error occurred while searching for movies'
      }))
    }
  }, [])

  /**
   * Clear search results and reset state
   */
  const clearSearch = useCallback(() => {
    setSearchState({
      movies: [],
      searchQuery: '',
      loading: false,
      error: null,
      hasSearched: false
    })
  }, [])

  /**
   * Retry the last search
   */
  const retrySearch = useCallback(() => {
    if (searchState.searchQuery) {
      performSearch(searchState.searchQuery)
    }
  }, [searchState.searchQuery, performSearch])

  return {
    ...searchState,
    performSearch,
    clearSearch,
    retrySearch
  }
} 