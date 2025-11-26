import React, { useState, useEffect } from 'react'
import axiosInstance from '../../api/axios'
import Pagination from '../ui/Pagination'

const AdminReviews = () => {
  const [reviews, setReviews] = useState([])
  const [allReviews, setAllReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    loadReviews()
  }, [])

  useEffect(() => {
    paginateReviews()
  }, [currentPage, allReviews])

  const loadReviews = async () => {
    try {
      const response = await axiosInstance.get('/reviews')
      setAllReviews(response.data.data?.reviews || [])
    } catch (error) {
      console.error('Failed to load reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const paginateReviews = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setReviews(allReviews.slice(startIndex, endIndex))
  }

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Delete this review?')) return
    
    try {
      await axiosInstance.delete(`/admin/reviews/${reviewId}`)
      alert('Review deleted successfully')
      loadReviews()
    } catch (error) {
      alert('Failed to delete review')
    }
  }

  const totalPages = Math.ceil(allReviews.length / itemsPerPage)

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Review Management</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total: {allReviews.length} reviews
        </div>
      </div>
      
      <div className="grid gap-4">
        {reviews.map((review) => (
          <div key={review.ID} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-yellow-500 text-xl">
                    {'⭐'.repeat(review.Rating)}
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {review.Rating}/5
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span className="font-medium">User ID:</span> #{review.UserID} • 
                  <span className="font-medium ml-2">Booking ID:</span> #{review.BookingID}
                </div>
                <p className="text-gray-900 dark:text-white leading-relaxed">{review.Comment}</p>
              </div>
              <button
                onClick={() => handleDeleteReview(review.ID)}
                className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        
        {reviews.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="text-gray-400 text-5xl mb-4">📝</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No reviews yet</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={allReviews.length}
        />
      )}
    </div>
  )
}

export default AdminReviews
