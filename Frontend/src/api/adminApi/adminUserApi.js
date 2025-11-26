// src/api/adminApi/adminUserApi.js
// API functions untuk admin user management
import axiosInstance from '../axios'

/**
 * Dapatkan semua users
 * @returns {Promise} List users
 */
export const getAdminUsers = async () => {
  const response = await axiosInstance.get('/admin/users')
  return response.data
}

/**
 * Dapatkan detail user
 * @param {number} id - User ID
 * @returns {Promise} Detail user
 */
export const getAdminUser = async (id) => {
  const response = await axiosInstance.get(`/admin/users/${id}`)
  return response.data
}

/**
 * Update user
 * @param {number} id - User ID
 * @param {Object} userData - Data user update
 * @returns {Promise} Response
 */
export const updateAdminUser = async (id, userData) => {
  const response = await axiosInstance.put(`/admin/users/${id}`, userData)
  return response.data
}

/**
 * Hapus user
 * @param {number} id - User ID
 * @returns {Promise} Response
 */
export const deleteAdminUser = async (id) => {
  const response = await axiosInstance.delete(`/admin/users/${id}`)
  return response.data
}

/**
 * Update user role
 * @param {number} id - User ID
 * @param {string} role - New role (admin/member)
 * @returns {Promise} Response
 */
export const updateUserRole = async (id, role) => {
  const response = await axiosInstance.put(`/admin/users/${id}/role`, { role })
  return response.data
}

