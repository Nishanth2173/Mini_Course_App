import React from 'react'

function Input({ label, error, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-600">
        {label}
      </label>

      <input
        {...props}
        className={`w-full px-4 py-3 rounded-xl border outline-none
        transition focus:ring-2 focus:ring-indigo-500
        ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
      />

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}

export default Input
