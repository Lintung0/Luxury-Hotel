// src/router/AppRouter.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'
import MemberRoute from './MemberRoute'

// Layouts
import MainLayout from '../layouts/MainLayout'
import AdminLayout from '../layouts/AdminLayout'

// Pages
import Home from '../pages/Home'
import Rooms from '../pages/Rooms'
import RoomDetail from '../pages/RoomDetail'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import MemberBookings from '../pages/Member/MemberBookings'
import MemberProfile from '../pages/Member/MemberProfile'
import MemberReviews from '../pages/Member/MemberReviews'
import AdminDashboard from '../pages/Admin/AdminDashboard'

// Admin Components
import AdminRooms from '../components/admin/AdminRooms'
import AdminBookings from '../components/admin/AdminBookings'
import AdminUsers from '../components/admin/AdminUsers'
import AdminReviews from '../components/admin/AdminReviews'

// Skeleton
import PageSkeleton from '../components/ui/PageSkeleton'

const AppRouter = () => {
  const { loading, isAuthenticated } = useAuth()

  if (loading) {
    return <PageSkeleton />
  }

  // Redirect jika sudah authenticated dan mencoba akses login/register
  const AuthRedirect = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/" replace />
    }
    return children
  }

  return (
    <Routes>
      {/* Public Routes dengan auth redirect */}
      <Route path="/login" element={
        <AuthRedirect>
          <Login />
        </AuthRedirect>
      } />
      <Route path="/register" element={
        <AuthRedirect>
          <Register />
        </AuthRedirect>
      } />
      
      {/* Protected Routes dengan Main Layout */}
      <Route path="/" element={
        <MainLayout>
          <Home />
        </MainLayout>
      } />
      <Route path="/rooms" element={
        <MainLayout>
          <Rooms />
        </MainLayout>
      } />
      <Route path="/rooms/:id" element={
        <MainLayout>
          <RoomDetail />
        </MainLayout>
      } />

      {/* Member Routes */}
      <Route path="/member/bookings" element={
        <ProtectedRoute>
          <MainLayout>
            <MemberBookings />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/member/profile" element={
        <ProtectedRoute>
          <MainLayout>
            <MemberProfile />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/member/reviews" element={
        <ProtectedRoute>
          <MainLayout>
            <MemberReviews />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin/*" element={
        <AdminRoute>
          <AdminLayout>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/rooms" element={<AdminRooms />} />
              <Route path="/bookings" element={<AdminBookings />} />
              <Route path="/users" element={<AdminUsers />} />
              <Route path="/reviews" element={<AdminReviews />} />
            </Routes>
          </AdminLayout>
        </AdminRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter