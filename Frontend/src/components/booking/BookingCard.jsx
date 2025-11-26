// src/components/booking/BookingCard.jsx
// Component untuk menampilkan card booking individual
import React, { useState } from 'react'
import { formatCurrency, formatDate } from '../../utils/formatter'
import PaymentModal from './PaymentModal'

const BookingCard = ({ booking, onCancel, onDelete, onPaymentSuccess }) => {
  const [showPayment, setShowPayment] = useState(false)
  const [currentBooking, setCurrentBooking] = useState(booking)

  const handlePaymentSuccess = () => {
    setCurrentBooking({ ...currentBooking, PaymentStatus: 'paid' })
    if (onPaymentSuccess) onPaymentSuccess()
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
      case 'completed':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'text-green-600 dark:text-green-400'
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'failed':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const canCancel = currentBooking.BookingStatus?.toLowerCase() !== 'completed' && 
                    currentBooking.BookingStatus?.toLowerCase() !== 'cancelled'
  const needsPayment = currentBooking.PaymentStatus?.toLowerCase() === 'pending'
  const isCancelled = currentBooking.BookingStatus?.toLowerCase() === 'cancelled'
  const canDelete = isCancelled && currentBooking.PaymentStatus?.toLowerCase() !== 'paid'

  return (
    <>
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${isCancelled ? 'opacity-75 border-2 border-red-300 dark:border-red-700' : 'gold-glow'}`}>
        {isCancelled && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
            <span className="text-2xl">❌</span>
            <div>
              <div className="font-semibold text-red-800 dark:text-red-200">Booking Cancelled</div>
              <div className="text-sm text-red-600 dark:text-red-400">This booking has been cancelled and is no longer active</div>
            </div>
          </div>
        )}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Room #{currentBooking.RoomID}
          </h3>
          <div className="flex flex-col gap-2 items-end">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(currentBooking.BookingStatus)}`}>
              {currentBooking.BookingStatus}
            </span>
            <span className={`text-xs font-medium ${getPaymentStatusColor(currentBooking.PaymentStatus)}`}>
              Payment: {currentBooking.PaymentStatus}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Check-in</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {formatDate(currentBooking.CheckInDate)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Check-out</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {formatDate(currentBooking.CheckOutDate)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Price</div>
            <div className="font-medium text-gold-600 text-lg">
              {formatCurrency(currentBooking.TotalPrice)}
            </div>
          </div>
        </div>

        {currentBooking.PaymentMethod && (
          <div className="mb-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Payment Method</div>
            <div className="text-gray-900 dark:text-white text-sm capitalize">
              {currentBooking.PaymentMethod.replace('_', ' ')}
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          {needsPayment && !isCancelled && (
            <button
              onClick={() => setShowPayment(true)}
              className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Pay Now
            </button>
          )}
          
          {canCancel && onCancel && (
            <button
              onClick={() => onCancel(currentBooking.ID)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Cancel Booking
            </button>
          )}

          {canDelete && onDelete && (
            <button
              onClick={() => onDelete(currentBooking.ID)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
            >
              <span>🗑️</span>
              Delete
            </button>
          )}
        </div>
      </div>

      {showPayment && (
        <PaymentModal
          booking={currentBooking}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  )
}

export default BookingCard