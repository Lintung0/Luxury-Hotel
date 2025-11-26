import React, { useState, useEffect } from 'react'
import { getAdminBookings } from '../../api/adminApi/adminBookingApi'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    activeBookings: 0
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const response = await getAdminBookings()
      const bookings = response.data?.bookings || []
      
      setStats({
        totalBookings: bookings.length,
        totalRevenue: bookings.reduce((sum, b) => sum + (b.TotalPrice || 0), 0),
        pendingPayments: bookings.filter(b => b.PaymentStatus === 'pending').length,
        activeBookings: bookings.filter(b => b.BookingStatus === 'confirmed').length
      })
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Bookings</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalBookings}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</div>
          <div className="text-3xl font-bold text-gold-600 mt-2">
            Rp {stats.totalRevenue.toLocaleString('id-ID')}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="text-sm text-gray-500 dark:text-gray-400">Pending Payments</div>
          <div className="text-3xl font-bold text-yellow-600 mt-2">{stats.pendingPayments}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="text-sm text-gray-500 dark:text-gray-400">Active Bookings</div>
          <div className="text-3xl font-bold text-green-600 mt-2">{stats.activeBookings}</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/admin/rooms" className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
            <div className="text-2xl mb-2">🏨</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">Manage Rooms</div>
          </a>
          <a href="/admin/bookings" className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
            <div className="text-2xl mb-2">📅</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">View Bookings</div>
          </a>
          <a href="/admin/users" className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">Manage Users</div>
          </a>
          <a href="/admin/reviews" className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
            <div className="text-2xl mb-2">⭐</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">View Reviews</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
