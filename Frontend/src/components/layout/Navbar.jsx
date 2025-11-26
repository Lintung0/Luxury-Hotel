// src/components/layout/Navbar.jsx
import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { FiSun, FiMoon, FiUser, FiLogOut, FiHome } from 'react-icons/fi'

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme()
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/') // Redirect ke home setelah logout
  }

  // Jangan tampilkan navbar di halaman login/register
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo dan Home */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gold-600 dark:text-gold-400">
                Grand Luxury Hotel
              </h1>
            </Link>
            
            {/* Tombol Home selalu visible */}
            <Link
              to="/"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <FiHome className="mr-1" />
              Home
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/rooms"
              className="text-gray-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Rooms
            </Link>

            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-gray-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                )}
                {!isAdmin && (
                  <>
                    <Link
                      to="/member/bookings"
                      className="text-gray-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      My Bookings
                    </Link>
                    <Link
                      to="/member/reviews"
                      className="text-gray-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      My Reviews
                    </Link>
                    <Link
                      to="/member/profile"
                      className="text-gray-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Profile
                    </Link>
                  </>
                )}
                
                <div className="flex items-center space-x-3 border-l border-gray-200 dark:border-gray-700 pl-3 ml-3">
                  <span className="text-gray-700 dark:text-gray-300 text-sm flex items-center">
                    <FiUser className="inline mr-1" />
                    {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 p-2 rounded-md transition-colors flex items-center"
                    title="Logout"
                  >
                    <FiLogOut size={16} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar