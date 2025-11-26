import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gold-100 via-white to-gold-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gold-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gold-200 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-25 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 dark:from-purple-900 dark:via-purple-800 dark:to-indigo-900 text-white py-20 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Welcome to Luxury Hotel</h1>
              <p className="text-xl mb-8 drop-shadow">Experience comfort and elegance in every stay</p>
              <Link
                to="/rooms"
                className="inline-block px-8 py-3 bg-white text-gold-600 dark:text-purple-900 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all shadow-lg"
              >
                Browse Rooms
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Why Choose Us
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                <div className="text-5xl mb-4">🏨</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Luxury Rooms
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Comfortable and elegant rooms with modern amenities
                </p>
              </div>
              
              <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                <div className="text-5xl mb-4">💳</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Easy Payment
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Multiple payment methods for your convenience
                </p>
              </div>
              
              <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Best Service
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  24/7 customer support and excellent service
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Book Your Stay?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of satisfied guests
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-3 bg-gold-600 hover:bg-gold-700 text-white rounded-lg font-semibold hover:scale-105 transition-all shadow-lg"
              >
                Sign Up Now
              </Link>
              <Link
                to="/rooms"
                className="px-8 py-3 border-2 border-gold-600 text-gold-600 dark:text-gold-400 rounded-lg font-semibold hover:bg-gold-50 dark:hover:bg-gray-800 hover:scale-105 transition-all"
              >
                View Rooms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
