// src/components/ui/AdminTableSkeleton.jsx
import React from 'react'
import SkeletonBlock from './SkeletonBlock'

const AdminTableSkeleton = ({ columns = 5, rows = 6 }) => {
  // Pre-calculate widths untuk menghindari Math.random() selama render
  const columnWidths = Array.from({ length: columns }, (_, index) => 
    `${70 + (index * 10) % 30}%` // Pattern deterministik, bukan random
  )
  
  const rowWidths = Array.from({ length: rows }, () => 
    Array.from({ length: columns }, (_, colIndex) => 
      `${60 + (colIndex * 15) % 40}%`
    )
  )

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <SkeletonBlock height="32px" width="200px" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {/* Table Head */}
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columnWidths.map((width, index) => (
                <th key={index} className="px-6 py-3 text-left">
                  <SkeletonBlock height="20px" width={width} />
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {rowWidths.map((widths, rowIndex) => (
              <tr key={rowIndex}>
                {widths.map((width, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <SkeletonBlock height="20px" width={width} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Skeleton */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <SkeletonBlock height="20px" width="150px" />
        <div className="flex space-x-2">
          {[...Array(4)].map((_, index) => (
            <SkeletonBlock key={index} height="32px" width="32px" rounded="md" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminTableSkeleton