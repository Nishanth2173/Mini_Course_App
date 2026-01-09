import React from 'react'

function AuthCard({ title, subtitle, children }) {
  return (
    <div className="w-full max-w-md bg-white/80 backdrop-blur-xl
      rounded-2xl shadow-xl p-8">
      
      <h2 className="text-3xl font-bold text-gray-800">
        {title}
      </h2>

      {subtitle && (
        <p className="text-sm text-gray-500 mt-1 mb-6">
          {subtitle}
        </p>
      )}

      {children}
    </div>
  )
}

export default AuthCard
