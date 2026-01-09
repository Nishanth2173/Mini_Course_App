import React from 'react'

function Popup({ msg, onClose }) {
  if (!msg) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
        <p className="text-gray-700">{msg}</p>
        <button
          onClick={onClose}
          className="mt-4 text-indigo-600 font-medium"
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default Popup