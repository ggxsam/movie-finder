import React from 'react'
import { FiCalendar, FiImage, FiHeart } from 'react-icons/fi'

/**
 * MovieCard component displays individual movie information
 * @param {Object} props
 * @param {Object} props.movie - Movie object from OMDB API
 * @param {Function} props.onToggleFavorite - Function to toggle favorite status
 * @param {Function} props.isFavorite - Function to check if movie is favorite
 */
const MovieCard = ({ movie, onToggleFavorite, isFavorite }) => {
  const { Title, Year, Poster, imdbID } = movie

  const handleImageError = (e) => {
    e.target.style.display = 'none'
    e.target.nextSibling.style.display = 'flex'
  }

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (onToggleFavorite) {
      onToggleFavorite(movie)
    } else {
      console.log('Toggle favorite for:', movie.Title)
    }
  }

  const isMovieFavorite = isFavorite ? isFavorite(imdbID) : false

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 group">
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] bg-gray-800">
        {Poster && Poster !== 'N/A' ? (
          <>
            <img
              src={Poster}
              alt={`${Title} poster`}
              className="w-full h-full object-cover"
              onError={handleImageError}
              loading="lazy"
            />
            {/* Fallback for broken images */}
            <div 
              className="absolute inset-0 hidden items-center justify-center bg-gray-800"
              style={{ display: 'none' }}
            >
              <FiImage className="text-4xl text-gray-500" />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <FiImage className="text-4xl text-gray-500" />
          </div>
        )}
        
        {/* Hover overlay with favorite button */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleToggleFavorite}
            className={`backdrop-blur-sm border rounded-full p-3 transition-all duration-200 hover:scale-110 ${
              isMovieFavorite
                ? 'bg-orange-500/30 border-orange-400/50 text-orange-400 hover:bg-orange-500/40'
                : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
            }`}
            aria-label={isMovieFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FiHeart 
              className={`text-xl transition-colors duration-200 ${
                isMovieFavorite ? 'fill-current' : ''
              }`} 
            />
          </button>
        </div>

        {/* Favorite indicator - visible when favorited */}
        {isMovieFavorite && (
          <div className="absolute top-2 right-2">
            <div className="bg-orange-500/90 backdrop-blur-sm rounded-full p-1.5">
              <FiHeart className="text-white text-sm fill-current" />
            </div>
          </div>
        )}
      </div>

      {/* Movie Information */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm leading-tight mb-2 line-clamp-2">
          {Title}
        </h3>
        
        <div className="flex items-center text-gray-400 text-xs">
          <FiCalendar className="mr-2 flex-shrink-0" />
          <span>{Year}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard 