// src/api/authApi.js
// API functions untuk authentication (login, register, me)
import axiosInstance from './axios'

/**
 * Login user
 * @param {Object} credentials - Email dan password
 * @returns {Promise} Response dari server
 */
export const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials)
  return response.data
}

/**
 * Register user baru
 * @param {Object} userData - Data user untuk registrasi
 * @returns {Promise} Response dari server
 */
export const register = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData)
  return response.data
}

/**
 * Dapatkan data user yang sedang login
 * @returns {Promise} Data user
 */
export const getMe = async () => {
  const response = await axiosInstance.get('/auth/me')
  return response.data
}

// Contoh request dan response structure:
/*
Login Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Login Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "role": "MEMBER"
  }
}

Register Request:
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}

Register Response:
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "role": "MEMBER"
  }
}
*/