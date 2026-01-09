import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center
      bg-gray-50 text-center p-6 overflow-hidden">

      {/* Animated 404 */}
      <h1 className="text-8xl font-extrabold text-indigo-600
        animate-bounce">
        404
      </h1>
      <p className="mt-4 text-2xl font-semibold text-gray-700">
        Oops! Page not found.
      </p>
      <p className="mt-2 text-gray-500">
        The page you're looking for doesn't exist.
      </p>

    </div>
  )
}

export default NotFound
