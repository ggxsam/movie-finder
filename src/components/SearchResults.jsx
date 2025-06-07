import React from 'react'
import { FiCalendar, FiImage } from 'react-icons/fi'
import MovieCard from './MovieCard'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'

const SearchResults = ({ movies, loading, error, searchQuery, onRetry, onToggleFavorite, isFavorite }) => {
  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-12">
        <FiImage className="text-6xl text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
        <p className="text-gray-400">
          {searchQuery ? `No results found for "${searchQuery}"` : 'Try searching for a movie title'}
        </p>
      </div>
    )
  }

  return (
    <div className="pb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Search Results
        </h2>
        <p className="text-gray-400">
          Found {movies.length} result{movies.length !== 1 ? 's' : ''} for "{searchQuery}"
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.imdbID} 
            movie={movie} 
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchResults 