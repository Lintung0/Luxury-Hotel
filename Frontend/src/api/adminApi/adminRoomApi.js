// src/api/adminApi/adminRoomApi.js
// API functions untuk admin room management
import axiosInstance from '../axios'

/**
 * Buat room baru
 * @param {Object} roomData - Data room
 * @returns {Promise} Response room
 */
export const createRoom = async (roomData) => {
  const response = await axiosInstance.post('/admin/rooms', roomData)
  return response.data
}

/**
 * Update room
 * @param {number} id - Room ID
 * @param {Object} roomData - Data room update
 * @returns {Promise} Response
 */
export const updateRoom = async (id, roomData) => {
  const response = await axiosInstance.put(`/admin/rooms/${id}`, roomData)
  return response.data
}

/**
 * Dapatkan detail room (admin)
 * @param {number} id - Room ID
 * @returns {Promise} Detail room
 */
export const getAdminRoom = async (id) => {
  const response = await axiosInstance.get(`/admin/rooms/${id}`)
  return response.data
}

/**
 * Hapus room
 * @param {number} id - Room ID
 * @returns {Promise} Response
 */
export const deleteRoom = async (id) => {
  const response = await axiosInstance.delete(`/admin/rooms/${id}`)
  return response.data
}

/**
 * Upload image untuk room
 * @param {number} roomId - Room ID
 * @param {FormData} formData - Image data
 * @returns {Promise} Response
 */
export const uploadRoomImage = async (roomId, formData) => {
  const response = await axiosInstance.post(`/admin/rooms/${roomId}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

/**
 * Update image caption
 * @param {number} imageId - Image ID
 * @param {Object} data - Caption data
 * @returns {Promise} Response
 */
export const updateRoomImage = async (imageId, data) => {
  const response = await axiosInstance.put(`/admin/rooms/images/${imageId}`, data)
  return response.data
}

/**
 * Hapus room image
 * @param {number} imageId - Image ID
 * @returns {Promise} Response
 */
export const deleteRoomImage = async (imageId) => {
  const response = await axiosInstance.delete(`/admin/rooms/images/${imageId}`)
  return response.data
}

/**
 * Dapatkan semua rooms (admin)
 * @returns {Promise} List rooms
 */
export const getAdminRooms = async () => {
  // Temporarily use public endpoint since admin endpoint has issues
  const response = await axiosInstance.get('/rooms')
  return response.data
}