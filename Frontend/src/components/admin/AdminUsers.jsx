import React, { useState, useEffect } from 'react'
import axiosInstance from '../../api/axios'
import { updateUserRole } from '../../api/adminApi/adminUserApi'
import Pagination from '../ui/Pagination'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [displayedUsers, setDisplayedUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    applyFilter()
  }, [filter, allUsers])

  useEffect(() => {
    paginateUsers()
  }, [currentPage, users])

  const loadUsers = async () => {
    try {
      const response = await axiosInstance.get('/admin/users')
      setAllUsers(response.data.data?.users || [])
    } catch (error) {
      console.error('Failed to load users:', error)
      alert('Failed to load users: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  const applyFilter = () => {
    let filtered = allUsers
    if (filter !== 'all') {
      filtered = allUsers.filter(user => user.Role === filter)
    }
    setUsers(filtered)
    setCurrentPage(1)
  }

  const paginateUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setDisplayedUsers(users.slice(startIndex, endIndex))
  }

  const handleDeleteUser = async (userId, username) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) return
    
    try {
      await axiosInstance.delete(`/admin/users/${userId}`)
      alert('User deleted successfully')
      loadUsers()
    } catch (error) {
      alert('Failed to delete user: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleChangeRole = async (userId, currentRole, username) => {
    const newRole = currentRole === 'admin' ? 'member' : 'admin'
    const action = newRole === 'admin' ? 'promote to Admin' : 'demote to Member'
    
    if (!window.confirm(`Are you sure you want to ${action} user "${username}"?`)) return
    
    try {
      await updateUserRole(userId, newRole)
      alert(`User role updated to ${newRole} successfully`)
      loadUsers()
    } catch (error) {
      alert('Failed to update role: ' + (error.response?.data?.message || error.message))
    }
  }

  const totalPages = Math.ceil(users.length / itemsPerPage)

  if (loading) return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
      <p className="mt-4 text-gray-500 dark:text-gray-400">Loading users...</p>
    </div>
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total: {users.length} users
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-gold-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All ({allUsers.length})
        </button>
        <button
          onClick={() => setFilter('admin')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'admin'
              ? 'bg-gold-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Admins ({allUsers.filter(u => u.Role === 'admin').length})
        </button>
        <button
          onClick={() => setFilter('member')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'member'
              ? 'bg-gold-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Members ({allUsers.filter(u => u.Role === 'member').length})
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {displayedUsers.map((user) => (
              <tr key={user.ID} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">#{user.ID}</td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.Username}</td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.FullName}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.Email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    user.Role === 'admin' 
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {user.Role.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button
                    onClick={() => handleChangeRole(user.ID, user.Role, user.Username)}
                    className={`font-medium ${
                      user.Role === 'admin'
                        ? 'text-orange-600 hover:text-orange-900 dark:text-orange-400'
                        : 'text-green-600 hover:text-green-900 dark:text-green-400'
                    }`}
                  >
                    {user.Role === 'admin' ? 'Demote' : 'Promote'}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.ID, user.Username)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {displayedUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">👥</div>
            <p className="text-gray-500 dark:text-gray-400">No users found</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={users.length}
        />
      )}
    </div>
  )
}

export default AdminUsers
