// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import { login as loginApi, register as registerApi } from '../api/authApi'
import { saveToken, getToken, removeToken, getRole, saveUser, getUser } from '../utils/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken()
      const savedUser = getUser()
      if (token && savedUser) {
        setUser(savedUser)
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
      
      const user = {
        id: userData.ID,
        username: userData.Username,
        email: userData.Email,
        full_name: userData.FullName,
        role: userData.Role
      }
      
      saveToken(token)
      saveUser(user)
      setUser(user)
      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await registerApi(userData)
      const token = response.data?.token || response.token
      const userResponse = response.data?.user || response.user
      
      if (token && userResponse) {
        const user = {
          id: userResponse.ID,
          username: userResponse.Username,
          email: userResponse.Email,
          full_name: userResponse.FullName,
          role: userResponse.Role
        }
        saveToken(token)
        saveUser(user)
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