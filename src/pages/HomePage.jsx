import React, { useState } from 'react'
import { Link } from 'react-router'
import { FiSearch, FiFilm, FiHeart } from 'react-icons/fi'
import { BiMoviePlay } from 'react-icons/bi'
import SearchResults from '../components/SearchResults'
import FavoritesList from '../components/FavoritesList'
import { useMovieSearch } from '../hooks/useMovieSearch'
import { useFavorites } from '../hooks/useFavorites'
import logo from '../assets/logo.png'

const HomePage = () => {
  const [inputValue, setInputValue] = useState('')
  const {
    movies,
    searchQuery,
    loading,
    error,
    hasSearched,
    performSearch,
    retrySearch,
  } = useMovieSearch()

  const {
    favorites,
    favoritesCount,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  } = useFavorites()

  const handleSearch = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      performSearch(inputValue.trim())
    }
  }

  const handleClearFavorites = () => {
    if (
      window.confirm(
        'Are you sure you want to clear all favorites? This action cannot be undone.'
      )
    ) {
      clearFavorites()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Header section - smaller when search results are shown */}
        <div
          className={`${
            hasSearched
              ? 'py-8'
              : 'min-h-screen flex items-center justify-center'
          }`}
        >
          <div className="w-full text-center">
            <div className={`${hasSearched ? 'mb-8' : 'mb-12'}`}>
              <div className="flex flex-col items-center justify-center mb-6">
                <img
                  src={logo}
                  alt="MovieFinder Logo"
                  className={`${
                    hasSearched ? 'w-12 h-12' : 'w-40 h-40'
                  } mr-4 transition-all duration-300`}
                />
                <h1
                  className={`${
                    hasSearched
                      ? 'text-4xl md:text-5xl'
                      : 'text-6xl md:text-7xl'
                  } font-bold text-white transition-all duration-300`}
                >
                  Movie
                  <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    Finder
                  </span>
                </h1>
              </div>
              {!hasSearched && (
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Discover your next favorite movie. Search through thousands of
                  films and find exactly what you're looking for.
                </p>
              )}
            </div>

            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative group">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Search for movies by name"
                  className="w-full px-6 py-4 pl-14 text-lg bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                  disabled={loading}
                />
                <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <button
                  type="submit"
                  disabled={loading || !inputValue.trim()}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>

            {/* Navigation and Search section */}
            <div className="mt-8">
              {/* Favorites Navigation - only show if there are favorites */}
              {favoritesCount > 0 && (
                <div className="flex justify-center mb-6">
                  <Link
                    to="/favorites"
                    className="inline-flex items-center px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 backdrop-blur-sm border border-orange-500/30 hover:border-orange-400/50 text-orange-300 hover:text-orange-200 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    <FiHeart className="mr-2 fill-current" />
                    View My Favorites ({favoritesCount})
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <SearchResults
            movies={movies}
            loading={loading}
            error={error}
            searchQuery={searchQuery}
            onRetry={retrySearch}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        )}

        {/* Favorites List - only show when there are search results and favorites */}
        {hasSearched && favoritesCount > 0 && (
          <FavoritesList
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onClearFavorites={handleClearFavorites}
            isFavorite={isFavorite}
          />
        )}
      </div>
    </div>
  )
}

export default HomePage
