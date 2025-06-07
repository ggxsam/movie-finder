import React from 'react'
import { FiHeart, FiTrash2 } from 'react-icons/fi'
import MovieCard from './MovieCard'

const FavoritesList = ({ favorites, onToggleFavorite, onClearFavorites, isFavorite }) => {
  if (!favorites || favorites.length === 0) {
    return (
      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <FiHeart className="mr-3 text-orange-400" />
            My Favorites
          </h2>
        </div>
        
        <div className="text-center py-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <FiHeart className="text-6xl text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No favorites yet</h3>
          <p className="text-gray-400">
            Start adding movies to your favorites by clicking the heart icon on any movie card
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <FiHeart className="mr-3 text-orange-400 fill-current" />
          My Favorites
          <span className="ml-2 text-sm bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full">
            {favorites.length}
          </span>
        </h2>
        
        <button
          onClick={onClearFavorites}
          className="flex items-center px-4 py-2 text-sm text-gray-400 hover:text-red-400 transition-colors duration-200 bg-white/5 hover:bg-red-500/10 backdrop-blur-sm border border-white/10 hover:border-red-500/20 rounded-lg"
          title="Clear all favorites"
        >
          <FiTrash2 className="mr-2" />
          Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {favorites.map((movie) => (
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

export default FavoritesList 