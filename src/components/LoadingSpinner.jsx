import React from 'react'
import { BiMoviePlay } from 'react-icons/bi'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <BiMoviePlay className="text-2xl text-orange-400 animate-pulse" />
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          Searching for movies...
        </h3>
        <p className="text-gray-400 text-sm">
          Please wait while we find the best matches
        </p>
      </div>
    </div>
  )
}

export default LoadingSpinner 