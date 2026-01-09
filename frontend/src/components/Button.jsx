import React from 'react'

function Button({
  text,
  onClick,
  full = false,
  disabled = false,
  className = ''
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        px-6 py-3 rounded-xl font-medium
        transition
        ${full ? 'w-full' : 'w-auto'}
        ${disabled
          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
          : 'bg-indigo-600 text-white hover:bg-indigo-700'}
        ${className}
      `}
    >
      {text}
    </button>
  )
}

export default Button