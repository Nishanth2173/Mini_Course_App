import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [open, setOpen] = useState(false)

  const avatarUrl = user?.name
    ? `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`
    : 'https://api.dicebear.com/7.x/initials/svg?seed=User'

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm px-6 py-4 flex justify-between items-center">

      <div className="flex items-center gap-6">
        <Link to="/home" className="text-xl font-bold text-indigo-600">
          Knowledge Nexus
        </Link>

        <Link to="/courses" className="text-gray-600 hover:text-indigo-600">
          Home
        </Link>

        <Link to="/my-courses" className="text-gray-600 hover:text-indigo-600">
          My Courses
        </Link>
      </div>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3"
        >
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-9 h-9 rounded-full border"
          />
          <span className="font-medium text-gray-700">
            {user?.name}
          </span>
        </button>
        {open && (
          <div
            className="absolute right-0 mt-3 w-48 bg-white
            border rounded-xl shadow-lg overflow-hidden"
          >
            <div className="px-4 py-3 text-sm text-gray-600">
              Signed in as <br />
              <span className="font-medium text-gray-800">
                {user?.name}
              </span>
            </div>

            <button
              onClick={() => {
                setOpen(false)
                navigate('/change-password')
              }}
              className="w-full text-left px-4 py-2 text-sm
              hover:bg-gray-100"
            >
              Change Password
            </button>

            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm
              text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar