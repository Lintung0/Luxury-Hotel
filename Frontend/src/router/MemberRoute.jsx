// src/router/MemberRoute.jsx
// Route protection khusus untuk member users
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const MemberRoute = ({ children }) => {
  const { isAuthenticated, isMember, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!isMember) {
    return <Navigate to="/" replace />
  }

  return children
}

export default MemberRoute