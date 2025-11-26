import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosInstance from '../../api/axios'

const MemberProfile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState({
    username: '',
    full_name: '',
    email: ''
  })
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (user) {
      setProfile({
        username: user.username || '',
        full_name: user.full_name || '',
        email: user.email || ''
      })
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.put('/member/profile', profile)
      alert('Profile updated successfully')
      setEditing(false)
    } catch (error) {
      alert('Failed to update profile')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Profile</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({...profile, username: e.target.value})}
                disabled={!editing}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                disabled={!editing}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                disabled={!editing}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
              />
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            {!editing ? (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="px-6 py-2 bg-gold-600 hover:bg-gold-700 text-white rounded-lg"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gold-600 hover:bg-gold-700 text-white rounded-lg"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default MemberProfile
