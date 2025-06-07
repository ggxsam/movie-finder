import React from 'react'
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi'

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-red-500/10 border border-red-500/20 rounded-full p-4 mb-6">
        <FiAlertCircle className="text-4xl text-red-400" />
      </div>
      
      <div className="text-center max-w-md">
        <h3 className="text-xl font-semibold text-white mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-400 mb-6 leading-relaxed">
          {message || 'An unexpected error occurred while searching for movies. Please try again.'}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <FiRefreshCw className="mr-2" />
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage 