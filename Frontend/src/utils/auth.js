// src/utils/auth.js
// Utility functions untuk authentication token management
/**
 * Simpan token ke localStorage
 * @param {string} token - JWT token
 */
export const saveToken = (token) => {
  localStorage.setItem('token', token)
}

/**
 * Dapatkan token dari localStorage
 * @returns {string|null} Token
 */
export const getToken = () => {
  return localStorage.getItem('token')
}

/**
 * Hapus token dari localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

/**
 * Simpan user data ke localStorage
 */
export const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

/**
 * Dapatkan user data dari localStorage
 */
export const getUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

/**
 * Dapatkan role user dari token
 * @returns {string|null} Role user
 */
export const getRole = () => {
  const token = getToken()
  if (!token) return null
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.role
  } catch {
    return null
  }
}

/**
 * Cek apakah user adalah admin
 * @returns {boolean} True jika admin
 */
export const isAdmin = () => {
  return getRole() === 'admin'
}

/**
 * Cek apakah user adalah member
 * @returns {boolean} True jika member
 */
export const isMember = () => {
  return getRole() === 'member'
}