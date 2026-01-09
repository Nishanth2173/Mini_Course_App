import React from 'react'

function Footer() {
  return (
    <footer className="w-full py-4 text-center text-sm text-gray-500 border-t sticky bottom-0 bg-white">
      &copy; {new Date().getFullYear()} Built by{' '}
      <span className="font-medium text-gray-700">
        Nishanth Nuthi
      </span>
    </footer>
  )
}

export default Footer
