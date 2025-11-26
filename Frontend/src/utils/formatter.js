// src/utils/formatter.js
// Utility functions untuk formatting data
/**
 * Format currency IDR
 * @param {number} amount - Jumlah uang
 * @returns {string} String terformat
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format date
 * @param {string} dateString - String date
 * @returns {string} Date terformat
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Format date untuk input
 * @param {string} dateString - String date
 * @returns {string} Date dalam format YYYY-MM-DD
 */
export const formatDateForInput = (dateString) => {
  return new Date(dateString).toISOString().split('T')[0]
}