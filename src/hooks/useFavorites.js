import { useState, useEffect, useCallback } from 'react'

const FAVORITES_KEY = 'movieFinder_favorites'

/**
 * Custom hook for managing favorite movies with localStorage persistence
 * @returns {Object} Favorites state and management functions
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY)
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites)
        // Validate that it's an array
        if (Array.isArray(parsedFavorites)) {
          setFavorites(parsedFavorites)
        }
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error)
      // Clear corrupted data
      localStorage.removeItem(FAVORITES_KEY)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save favorites to localStorage whenever favorites change (but not on initial load)
  useEffect(() => {
    if (!isLoaded) return // Don't save until we've loaded from localStorage
    
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error)
    }
  }, [favorites, isLoaded])

  /**
   * Check if a movie is in favorites
   * @param {string} imdbID - The IMDb ID of the movie
   * @returns {boolean} Whether the movie is favorited
   */
  const isFavorite = useCallback((imdbID) => {
    return favorites.some(movie => movie.imdbID === imdbID)
  }, [favorites])

  /**
   * Add a movie to favorites
   * @param {Object} movie - Movie object to add
   */
  const addToFavorites = useCallback((movie) => {
    if (!movie || !movie.imdbID) {
      console.error('Invalid movie object provided to addToFavorites')
      return
    }

    setFavorites(prevFavorites => {
      // Check if movie is already in favorites to prevent duplicates
      const isAlreadyFavorite = prevFavorites.some(fav => fav.imdbID === movie.imdbID)
      
      if (isAlreadyFavorite) {
        return prevFavorites // No change if already in favorites
      }

      // Add movie to the beginning of the array (most recent first)
      return [movie, ...prevFavorites]
    })
  }, [])

  /**
   * Remove a movie from favorites
   * @param {string} imdbID - The IMDb ID of the movie to remove
   */
  const removeFromFavorites = useCallback((imdbID) => {
    if (!imdbID) {
      console.error('Invalid imdbID provided to removeFromFavorites')
      return
    }

    setFavorites(prevFavorites => 
      prevFavorites.filter(movie => movie.imdbID !== imdbID)
    )
  }, [])

  /**
   * Toggle a movie's favorite status
   * @param {Object} movie - Movie object to toggle
   */
  const toggleFavorite = useCallback((movie) => {
    if (!movie || !movie.imdbID) {
      console.error('Invalid movie object provided to toggleFavorite')
      return
    }

    if (isFavorite(movie.imdbID)) {
      removeFromFavorites(movie.imdbID)
    } else {
      addToFavorites(movie)
    }
  }, [isFavorite, addToFavorites, removeFromFavorites])

  /**
   * Clear all favorites
   */
  const clearFavorites = useCallback(() => {
    setFavorites([])
  }, [])

  /**
   * Get the total number of favorites
   * @returns {number} Number of favorite movies
   */
  const favoritesCount = favorites.length

  return {
    favorites,
    favoritesCount,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites,
    isLoaded
  }
} 