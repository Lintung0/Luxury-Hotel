// src/api/reviewApi.js
// API functions untuk reviews (public dan member endpoints)
import axiosInstance from './axios'

/**
 * Dapatkan reviews untuk room tertentu
 * @param {number} roomId - Room ID
 * @returns {Promise} List reviews
 */
export const getRoomReviews = async (roomId) => {
  const response = await axiosInstance.get(`/reviews/room/${roomId}`)
  return response.data
}

/**
 * Dapatkan detail review
 * @param {number} id - Review ID
 * @returns {Promise} Detail review
 */
export const getReview = async (id) => {
  const response = await axiosInstance.get(`/reviews/${id}`)
  return response.data
}

/**
 * Buat review baru
 * @param {Object} reviewData - Data review
 * @returns {Promise} Response review
 */
export const createReview = async (reviewData) => {
  const response = await axiosInstance.post('/member/reviews', reviewData)
  return response.data
}

/**
 * Update review
 * @param {number} id - Review ID
 * @param {Object} reviewData - Data review update
 * @returns {Promise} Response
 */
export const updateReview = async (id, reviewData) => {
  const response = await axiosInstance.put(`/member/reviews/${id}`, reviewData)
  return response.data
}

/**
 * Hapus review
 * @param {number} id - Review ID
 * @returns {Promise} Response
 */
export const deleteReview = async (id) => {
  const response = await axiosInstance.delete(`/member/reviews/${id}`)
  return response.data
}

// Contoh request dan response structure:
/*
Create Review Request:
{
  "room_id": 1,
  "rating": 5,
  "comment": "Excellent stay!",
  "title": "Amazing Experience"
}

Create Review Response:
{
  "id": 1,
  "rating": 5,
  "comment": "Excellent stay!",
  "user": {
    "name": "John Doe"
  }
}
*/