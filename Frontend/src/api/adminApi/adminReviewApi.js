// src/api/adminApi/adminReviewApi.js
// API functions untuk admin review management
import axiosInstance from '../axios'

/**
 * Hapus review (admin)
 * @param {number} id - Review ID
 * @returns {Promise} Response
 */
export const deleteAdminReview = async (id) => {
  const response = await axiosInstance.delete(`/admin/reviews/${id}`)
  return response.data
}