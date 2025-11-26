import React, { useState, useEffect } from 'react'
import axiosInstance from '../../api/axios'
import { formatDate } from '../../utils/formatter'

const MemberReviews = () => {
  const [bookings, setBookings] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [bookingsRes, reviewsRes] = await Promise.all([
        axiosInstance.get('/member/bookings'),
        axiosInstance.get('/member/reviews')
      ])
      
      const bookingsData = bookingsRes.data.data?.bookings || []
      const reviewsData = reviewsRes.data.data?.reviews || []
      
      setBookings(bookingsData)
      setReviews(reviewsData)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    
    if (!reviewForm.comment.trim()) {
      alert('Please write a comment')
      return
    }

    setSubmitting(true)
    try {
      await axiosInstance.post('/member/reviews', {
        booking_id: selectedBooking.ID,
        rating: reviewForm.rating,
        comment: reviewForm.comment
      })
      
      alert('Review submitted successfully! Thank you for your feedback.')
      setShowModal(false)
      setReviewForm({ rating: 5, comment: '' })
      setSelectedBooking(null)
      loadData()
    } catch (error) {
      alert('Failed to submit review: ' + (error.response?.data?.message || error.message))
    } finally {
      setSubmitting(false)
    }
  }

  const completedBookings = bookings.filter(b => b.BookingStatus === 'completed')
  const reviewedBookingIds = reviews.map(r => r.BookingID)
  const bookingsToReview = completedBookings.filter(b => !reviewedBookingIds.includes(b.ID))

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading reviews...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Reviews</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Share your experience with us</p>
      
      {/* Bookings yang bisa direview */}
      {bookingsToReview.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            ✍️ Write a Review
          </h2>
          <div className="grid gap-4">
            {bookingsToReview.map((booking) => (
              <div key={booking.ID} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🏨</span>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          Room #{booking.RoomID}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Booking #{booking.ID} • Completed
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <span className="font-medium">Stay:</span> {formatDate(booking.CheckInDate)} - {formatDate(booking.CheckOutDate)}
                    </div>
                    {booking.GuestName && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Guest:</span> {booking.GuestName}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedBooking(booking)
                      setShowModal(true)
                    }}
                    className="px-6 py-2 bg-gold-600 hover:bg-gold-700 text-white rounded-lg font-medium transition-colors shadow-lg"
                  >
                    Write Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews yang sudah ditulis */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          📝 My Past Reviews ({reviews.length})
        </h2>
        
        {reviews.length > 0 ? (
          <div className="grid gap-4">
            {reviews.map((review) => (
              <div key={review.ID} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">⭐</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-yellow-500 text-lg">
                        {'⭐'.repeat(review.Rating)}
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {review.Rating}/5
                      </span>
                    </div>
                    <p className="text-gray-900 dark:text-white mb-3 leading-relaxed">
                      {review.Comment}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Booking #{review.BookingID} • {new Date(review.CreatedAt).toLocaleDateString('id-ID', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No reviews yet</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Complete a booking to write your first review
            </p>
          </div>
        )}
      </div>

      {/* No bookings to review message */}
      {bookingsToReview.length === 0 && completedBookings.length === 0 && (
        <div className="mb-8 text-center py-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-blue-600 dark:text-blue-400 text-5xl mb-3">ℹ️</div>
          <p className="text-blue-800 dark:text-blue-300 font-medium mb-1">
            No completed bookings yet
          </p>
          <p className="text-blue-600 dark:text-blue-400 text-sm">
            You can write a review after your stay is completed
          </p>
        </div>
      )}

      {/* Modal untuk menulis review */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Write Review</h3>
              <button
                onClick={() => {
                  setShowModal(false)
                  setReviewForm({ rating: 5, comment: '' })
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Booking #{selectedBooking.ID}</div>
              <div className="font-medium text-gray-900 dark:text-white">Room #{selectedBooking.RoomID}</div>
            </div>

            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rating *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({...reviewForm, rating: star})}
                      className={`text-3xl transition-transform hover:scale-110 ${
                        star <= reviewForm.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'
                      }`}
                    >
                      ⭐
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 self-center">
                    {reviewForm.rating}/5
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Review *
                </label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-gold-500 focus:border-gold-500"
                  placeholder="Share your experience with us..."
                  required
                />
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {reviewForm.comment.length} characters
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setReviewForm({ rating: 5, comment: '' })
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-colors"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-gold-600 hover:bg-gold-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Review'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MemberReviews
