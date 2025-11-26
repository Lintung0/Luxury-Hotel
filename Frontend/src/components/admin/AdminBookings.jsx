// src/components/admin/AdminBookings.jsx
// Component untuk admin booking management dengan status updates
import React, { useState, useEffect } from 'react'
import { 
  getAdminBookings, 
  getAdminBooking, 
  updateAdminBooking 
} from '../../api/adminApi/adminBookingApi'
import AdminTableSkeleton from '../ui/AdminTableSkeleton'
import Pagination from '../ui/Pagination'
import { formatCurrency, formatDate } from '../../utils/formatter'

const AdminBookings = () => {
  const [bookings, setBookings] = useState([])
  const [allBookings, setAllBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [statusUpdate, setStatusUpdate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    loadBookings()
  }, [])

  useEffect(() => {
    paginateBookings()
  }, [currentPage, allBookings])

  const loadBookings = async () => {
    try {
      const response = await getAdminBookings()
      const bookingsData = response.data?.bookings || response.bookings || []
      setAllBookings(bookingsData)
    } catch (error) {
      console.error('Failed to load bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const paginateBookings = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setBookings(allBookings.slice(startIndex, endIndex))
  }

  const handleViewDetails = async (bookingId) => {
    try {
      const booking = await getAdminBooking(bookingId)
      setSelectedBooking(booking)
      setStatusUpdate(booking.BookingStatus || '')
      setShowDetailModal(true)
    } catch (error) {
      console.error('Failed to load booking details:', error)
      alert('Failed to load booking details')
    }
  }

  const handleStatusUpdate = async () => {
    if (!selectedBooking || !statusUpdate) return

    try {
      await updateAdminBooking(selectedBooking.ID, { status: statusUpdate })
      setShowDetailModal(false)
      setSelectedBooking(null)
      loadBookings()
      alert('Booking status updated successfully')
    } catch (error) {
      console.error('Failed to update booking status:', error)
      alert('Failed to update booking status')
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'refunded':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  if (loading) {
    return <AdminTableSkeleton />
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Booking Management
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total: {bookings.length} bookings
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {bookings.map((booking) => (
                <tr key={booking.ID} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    #{booking.ID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      User #{booking.UserID}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    Room #{booking.RoomID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {formatDate(booking.CheckInDate)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      to {formatDate(booking.CheckOutDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatCurrency(booking.TotalPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.BookingStatus)}`}>
                      {booking.BookingStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(booking.PaymentStatus)}`}>
                      {booking.PaymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(booking.ID)}
                      className="text-gold-600 hover:text-gold-900 dark:text-gold-400 dark:hover:text-gold-300"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No bookings found.
          </div>
        )}
      </div>

      {allBookings.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(allBookings.length / itemsPerPage)}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={allBookings.length}
        />
      )}

      {/* Booking Detail Modal */}
      {showDetailModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Booking Details - #{selectedBooking.ID}
                </h2>
                <button
                  onClick={() => {
                    setShowDetailModal(false)
                    setSelectedBooking(null)
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Guest Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Guest Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-500 dark:text-gray-400">User ID:</span>
                      <p className="text-gray-900 dark:text-white">#{selectedBooking.UserID}</p>
                    </div>
                  </div>
                </div>

                {/* Room Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Room Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-500 dark:text-gray-400">Room ID:</span>
                      <p className="text-gray-900 dark:text-white">#{selectedBooking.RoomID}</p>
                    </div>
                  </div>
                </div>

                {/* Booking Dates */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Booking Period
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-500 dark:text-gray-400">Check-in:</span>
                      <p className="text-gray-900 dark:text-white">{formatDate(selectedBooking.CheckInDate)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500 dark:text-gray-400">Check-out:</span>
                      <p className="text-gray-900 dark:text-white">{formatDate(selectedBooking.CheckOutDate)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500 dark:text-gray-400">Nights:</span>
                      <p className="text-gray-900 dark:text-white">
                        {Math.ceil((new Date(selectedBooking.CheckOutDate) - new Date(selectedBooking.CheckInDate)) / (1000 * 60 * 60 * 24))}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Pricing Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-t dark:border-gray-600 pt-2">
                      <span className="font-medium text-gray-500 dark:text-gray-400">Total Amount:</span>
                      <span className="font-bold text-gold-600">{formatCurrency(selectedBooking.TotalPrice)}</span>
                    </div>
                  </div>
                </div>

                {/* Status Management */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Status Management
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Booking Status:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedBooking.BookingStatus)}`}>
                        {selectedBooking.BookingStatus}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Status:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(selectedBooking.PaymentStatus)}`}>
                        {selectedBooking.PaymentStatus}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Update Status:</span>
                      <select
                        value={statusUpdate}
                        onChange={(e) => setStatusUpdate(e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-gold-500 focus:border-gold-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t dark:border-gray-600">
                  <button
                    onClick={() => {
                      setShowDetailModal(false)
                      setSelectedBooking(null)
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-md"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={!statusUpdate || statusUpdate === selectedBooking.BookingStatus}
                    className="px-4 py-2 text-sm font-medium text-white bg-gold-600 hover:bg-gold-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBookings