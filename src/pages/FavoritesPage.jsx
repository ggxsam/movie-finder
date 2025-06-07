import React from 'react'
import { Link } from 'react-router'
import { FiHeart, FiArrowLeft, FiTrash2 } from 'react-icons/fi'
import { BiMoviePlay } from 'react-icons/bi'
import MovieCard from '../components/MovieCard'
import { useFavorites } from '../hooks/useFavorites'
import logo from '../assets/logo.png'

const FavoritesPage = () => {
  const {
    favorites,
    favoritesCount,
    isFavorite,
    toggleFavorite,
    clearFavorites
  } = useFavorites()

  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites? This action cannot be undone.')) {
      clearFavorites()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Link 
              to="/"
              className="mr-4 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg transition-all duration-200 hover:scale-105"
              title="Back to Home"
            >
              <FiArrowLeft className="text-white text-xl" />
            </Link>
            <div className="flex items-center">
              <img 
                src={logo} 
                alt="MovieFinder Logo" 
                className="w-12 h-12 mr-4"
              />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                My
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent ml-2">
                  Favorites
                </span>
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
            Your personal collection of favorite movies
          </p>
        </div>

        {!favorites || favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-12 max-w-md mx-auto">
              <FiHeart className="text-6xl text-gray-500 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">No favorites yet</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Start adding movies to your favorites by searching and clicking the heart icon on any movie card
              </p>
              <Link 
                to="/"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <FiArrowLeft className="mr-2" />
                Go Search Movies
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <FiHeart className="text-3xl text-orange-400 fill-current mr-4" />
                <h2 className="text-2xl font-bold text-white">
                  {favoritesCount} Favorite{favoritesCount !== 1 ? 's' : ''}
                </h2>
              </div>
              
              <button
                onClick={handleClearFavorites}
                className="flex items-center px-6 py-3 text-sm text-gray-400 hover:text-red-400 transition-colors duration-200 bg-white/5 hover:bg-red-500/10 backdrop-blur-sm border border-white/10 hover:border-red-500/20 rounded-lg"
                title="Clear all favorites"
              >
                <FiTrash2 className="mr-2" />
                Clear All Favorites
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {favorites.map((movie) => (
                <MovieCard 
                  key={movie.imdbID} 
                  movie={movie} 
                  onToggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage 