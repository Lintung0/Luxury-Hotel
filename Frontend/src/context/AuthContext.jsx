// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import { login as loginApi, register as registerApi } from '../api/authApi'
import { saveToken, getToken, removeToken, getRole } from '../utils/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken()
      if (token) {
        try {
          // Decode token untuk mendapatkan user info
          const payload = JSON.parse(atob(token.split('.')[1]))
          setUser({
            id: payload.user_id,
            role: payload.role
          })
        } catch (error) {
          console.error('Token decode failed:', error)
          removeToken()
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (credentials) => {
    try {
      const response = await loginApi(credentials)
      const token = response.data?.token || response.token
      const userData = response.data?.user || response.user
      
      saveToken(token)
      setUser(userData)
      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await registerApi(userData)
      // Register biasanya tidak langsung login, tapi jika ada token maka login
      const token = response.data?.token || response.token
      const user = response.data?.user || response.user
      
      if (token) {
        saveToken(token)
        setUser(user)
      }
      return response
    } catch (error) {
      console.error('Register error:', error)
      throw error
    }
  }

  const logout = () => {
    removeToken()
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: getRole() === 'admin',
    isMember: getRole() === 'member'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}