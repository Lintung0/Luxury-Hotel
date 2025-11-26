// src/api/adminApi/adminBookingApi.js
// API functions untuk admin booking management
import axiosInstance from '../axios'

/**
 * Dapatkan semua bookings (admin)
 * @returns {Promise} List bookings
 */
export const getAdminBookings = async () => {
  const response = await axiosInstance.get('/admin/bookings')
  return response.data
}

/**
 * Dapatkan detail booking (admin)
 * @param {number} id - Booking ID
 * @returns {Promise} Detail booking
 */
export const getAdminBooking = async (id) => {
  const response = await axiosInstance.get(`/admin/bookings/${id}`)
  return response.data.data
}

/**
 * Update booking status
 * @param {number} id - Booking ID
 * @param {Object} updateData - Data update {status: 'confirmed'}
 * @returns {Promise} Response
 */
export const updateAdminBooking = async (id, updateData) => {
  const response = await axiosInstance.put(`/admin/bookings/${id}/status`, updateData)
  return response.data.data
}

/**
 * Update payment status
 * @param {number} id - Booking ID
 * @param {string} status - Payment status (pending, paid, failed)
 * @returns {Promise} Response
 */
export const updatePaymentStatus = async (id, status) => {
  const response = await axiosInstance.put(`/admin/bookings/${id}/payment-status`, { payment_status: status })
  return response.data
}