import React, { useState, useEffect } from 'react'
import { getMemberBookings, cancelBooking, deleteBooking } from '../../api/bookingApi'
import BookingCard from '../../components/booking/BookingCard'
import BookingListSkeleton from '../../components/ui/BookingListSkeleton'
import Pagination from '../../components/ui/Pagination'

const MemberBookings = () => {
  const [bookings, setBookings] = useState([])
  const [allBookings, setAllBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    loadBookings()
  }, [])

  useEffect(() => {
    paginateBookings()
  }, [currentPage, allBookings])

  const loadBookings = async () => {
    try {
      const response = await getMemberBookings()
      const bookingsData = response.data?.bookings || response.bookings || response.data || []
      setAllBookings(bookingsData)
      setError(null)
    } catch (error) {
      console.error('Failed to load bookings:', error)
      const errorMsg = error.response?.data?.message || error.message || 'Failed to load bookings'
      setError(errorMsg)
      setAllBookings([])
    } finally {
      setLoading(false)
    }
  }

  const paginateBookings = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setBookings(allBookings.slice(startIndex, endIndex))
  }

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return
    }

    try {
      await cancelBooking(bookingId)
      setMessage('Booking cancelled successfully')
      setTimeout(() => setMessage(''), 3000)
      loadBookings()
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to cancel booking'
      setMessage(errorMsg)
      setTimeout(() => setMessage(''), 5000)
      console.error('Error cancelling booking:', error)
    }
  }

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to permanently delete this cancelled booking?')) {
      return
    }

    try {
      await deleteBooking(bookingId)
      setMessage('Booking deleted successfully')
      setTimeout(() => setMessage(''), 3000)
      loadBookings()
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to delete booking'
      setMessage(errorMsg)
      setTimeout(() => setMessage(''), 5000)
      console.error('Error deleting booking:', error)
    }
  }

  const totalPages = Math.ceil(allBookings.length / itemsPerPage)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Bookings
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Manage your upcoming and past bookings
        </p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-md ${
          message.includes('success') 
            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
            : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
        }`}>
          {message}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-md bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
          <strong>Error:</strong> {error}
          <br />
          <button 
            onClick={loadBookings}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Try Again
          </button>
        </div>
      )}

      {loading ? (
        <BookingListSkeleton />
      ) : allBookings.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
            You don't have any bookings yet
          </div>
          <a
            href="/rooms"
            className="text-gold-600 hover:text-gold-700 font-medium"
          >
            Browse Rooms
          </a>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.ID}
                booking={booking}
                onCancel={handleCancelBooking}
                onDelete={handleDeleteBooking}
                onPaymentSuccess={loadBookings}
              />
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={allBookings.length}
            />
          )}
        </>
      )}
    </div>
  )
}

export default MemberBookings
