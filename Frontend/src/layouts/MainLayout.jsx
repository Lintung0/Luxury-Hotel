// src/layouts/MainLayout.jsx
// Main layout component untuk public pages
import React from 'react'
import Navbar from '../components/layout/Navbar'

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="transition-colors duration-300">
        {children}
      </main>
    </div>
  )
}

export default MainLayout