// src/api/adminApi/adminPaymentApi.js
// API functions untuk admin payment management
import axiosInstance from '../axios'

/**
 * Get all payments (admin)
 * @returns {Promise} List payments
 */
export const getAdminPayments = async () => {
  const response = await axiosInstance.get('/admin/payments')
  return response.data
}

/**
 * Get payment by ID (admin)
 * @param {number} id - Payment ID
 * @returns {Promise} Payment detail
 */
export const getAdminPayment = async (id) => {
  const response = await axiosInstance.get(`/admin/payments/${id}`)
  return response.data
}

/**
 * Update payment status (admin)
 * @param {number} id - Payment ID
 * @param {string} status - Payment status
 * @returns {Promise} Response
 */
export const updatePaymentStatus = async (id, status) => {
  const response = await axiosInstance.put(`/admin/payments/${id}`, { status })
  return response.data
}
