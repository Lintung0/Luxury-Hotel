# Admin Dashboard - Grand Luxury Hotel

## 🎯 Overview

Admin dashboard untuk mengelola seluruh sistem hotel booking dengan fitur lengkap CRUD operations.

---

## 🔐 Access

**Role Required**: `admin`

**URL**: `/admin`

**Login**: Gunakan akun dengan role admin

---

## 📊 Features Implemented

### 1. Dashboard Overview (`/admin`)

**Features**:
- ✅ Statistics cards (Rooms, Bookings, Check-ins, Revenue)
- ✅ Quick action buttons
- ✅ Navigation to all admin sections

**Components**:
- `src/pages/Admin/AdminDashboard.jsx`

---

### 2. Room Management (`/admin/rooms`)

**Backend Endpoints**:
```
GET    /api/admin/rooms          - List all rooms
POST   /api/admin/rooms          - Create room
PUT    /api/admin/rooms/:id      - Update room
DELETE /api/admin/rooms/:id      - Delete room
POST   /api/admin/rooms/:id/images     - Add room image
DELETE /api/admin/rooms/images/:id     - Delete room image
```

**Features**:
- ✅ View all rooms with pagination
- ✅ Create new room (modal)
- ✅ Edit room details (modal)
- ✅ Delete room (confirmation)
- ✅ Upload room images
- ✅ Delete room images
- ✅ Set primary image
- ✅ Search & filter rooms

**Component**: `src/components/admin/AdminRooms.jsx`

**API**: `src/api/adminApi/adminRoomApi.js`

**CRUD Operations**:

**Create Room**:
```javascript
{
  room_number: "101",
  type: "Deluxe",
  price: 1500000,
  description: "Luxury room with ocean view",
  status: "available",
  max_occupancy: 2
}
```

**Update Room**:
```javascript
{
  room_number: "101",
  type: "Suite",
  price: 2500000,
  description: "Updated description",
  status: "maintenance",
  max_occupancy: 4
}
```

**Add Image**:
```javascript
{
  room_id: 1,
  image_url: "https://example.com/image.jpg",
  is_primary: true
}
```

---

### 3. Booking Management (`/admin/bookings`)

**Backend Endpoints**:
```
GET /api/admin/bookings           - List all bookings
GET /api/admin/bookings/:id       - Get booking detail
PUT /api/admin/bookings/:id       - Update booking
PUT /api/admin/bookings/:id/payment-status - Update payment status
```

**Features**:
- ✅ View all bookings
- ✅ Filter by status (confirmed, cancelled, completed)
- ✅ Filter by payment status (pending, paid, failed)
- ✅ Update payment status
- ✅ View booking details
- ✅ Search bookings
- ✅ Export bookings (optional)

**Component**: `src/components/admin/AdminBookings.jsx`

**API**: `src/api/adminApi/adminBookingApi.js`

**Update Payment Status**:
```javascript
{
  payment_status: "paid" // or "pending", "failed"
}
```

---

### 4. User Management (`/admin/users`)

**Backend Endpoints**:
```
GET    /api/admin/users          - List all users
GET    /api/admin/users/:id      - Get user detail
POST   /api/admin/users          - Create user
PUT    /api/admin/users/:id      - Update user
DELETE /api/admin/users/:id      - Delete user
```

**Features**:
- ✅ View all users
- ✅ Create new user (admin/member)
- ✅ Edit user details
- ✅ Change user role
- ✅ Delete user
- ✅ Search users
- ✅ Filter by role

**Component**: `src/components/admin/AdminUsers.jsx`

**API**: `src/api/adminApi/adminUserApi.js`

**Create User**:
```javascript
{
  username: "newuser",
  full_name: "New User",
  email: "newuser@example.com",
  password: "password123",
  role: "member" // or "admin"
}
```

**Update User**:
```javascript
{
  username: "updateduser",
  full_name: "Updated Name",
  email: "updated@example.com",
  role: "admin"
}
```

---

### 5. Review Management (`/admin/reviews`)

**Backend Endpoints**:
```
GET    /api/reviews/room/:roomId  - Get reviews by room (public)
GET    /api/reviews/:id           - Get review detail (public)
DELETE /api/admin/reviews/:id     - Delete review (admin)
```

**Features**:
- ✅ View all reviews
- ✅ Filter by room
- ✅ Filter by rating
- ✅ Delete inappropriate reviews
- ✅ View review details
- ✅ Search reviews

**Component**: `src/components/admin/AdminReviews.jsx`

**API**: `src/api/adminApi/adminReviewApi.js`

---

## 🎨 UI Components

### Admin Layout

**Sidebar Navigation**:
- Dashboard (📊)
- Rooms (🏨)
- Bookings (📅)
- Users (👥)
- Reviews (⭐)

**Features**:
- Active menu highlighting
- Responsive design
- Dark/Light theme support
- Smooth transitions

### Common Components

**Modals**:
- Create/Edit forms with validation
- Delete confirmation dialogs
- Image upload preview
- Slide-in animation

**Tables**:
- Sortable columns
- Pagination
- Search functionality
- Action buttons (Edit, Delete)
- Status badges
- Loading skeleton

**Forms**:
- Input validation
- Error messages
- Required field indicators
- Submit/Cancel buttons
- Loading states

---

## 🔄 Data Flow

### Example: Create Room

1. **User Action**: Click "Add Room" button
2. **UI**: Modal opens with form
3. **User**: Fill form and submit
4. **Frontend**: Validate input
5. **API Call**: `POST /api/admin/rooms`
6. **Backend**: Validate & save to database
7. **Response**: Success/Error message
8. **UI Update**: Close modal, refresh table, show toast

### Example: Update Payment Status

1. **User Action**: Select booking, click "Mark as Paid"
2. **UI**: Confirmation dialog
3. **User**: Confirm action
4. **API Call**: `PUT /api/admin/bookings/:id/payment-status`
5. **Backend**: Update booking payment status
6. **Response**: Success message
7. **UI Update**: Update table row, show toast

---

## 🧪 Testing Admin Features

### 1. Room Management

**Create Room**:
```bash
# Login as admin
# Navigate to /admin/rooms
# Click "Add Room"
# Fill form:
  - Room Number: 201
  - Type: Deluxe
  - Price: 1500000
  - Description: Test room
  - Max Occupancy: 2
# Submit
# Verify room appears in table
```

**Upload Image**:
```bash
# Click room row
# Click "Add Image"
# Enter image URL
# Set as primary (optional)
# Submit
# Verify image appears
```

### 2. Booking Management

**Update Payment Status**:
```bash
# Navigate to /admin/bookings
# Find booking with "pending" payment
# Click "Update Status"
# Select "paid"
# Confirm
# Verify status updated
```

### 3. User Management

**Create Admin User**:
```bash
# Navigate to /admin/users
# Click "Add User"
# Fill form:
  - Username: admintest
  - Full Name: Admin Test
  - Email: admin@test.com
  - Password: password123
  - Role: admin
# Submit
# Verify user created
```

### 4. Review Management

**Delete Review**:
```bash
# Navigate to /admin/reviews
# Find review to delete
# Click "Delete"
# Confirm deletion
# Verify review removed
```

---

## 📋 API Summary

### Admin Endpoints Available

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/rooms` | List all rooms |
| POST | `/api/admin/rooms` | Create room |
| PUT | `/api/admin/rooms/:id` | Update room |
| DELETE | `/api/admin/rooms/:id` | Delete room |
| POST | `/api/admin/rooms/:id/images` | Add room image |
| DELETE | `/api/admin/rooms/images/:id` | Delete room image |
| GET | `/api/admin/bookings` | List all bookings |
| GET | `/api/admin/bookings/:id` | Get booking detail |
| PUT | `/api/admin/bookings/:id` | Update booking |
| PUT | `/api/admin/bookings/:id/payment-status` | Update payment status |
| GET | `/api/admin/users` | List all users |
| GET | `/api/admin/users/:id` | Get user detail |
| POST | `/api/admin/users` | Create user |
| PUT | `/api/admin/users/:id` | Update user |
| DELETE | `/api/admin/users/:id` | Delete user |
| DELETE | `/api/admin/reviews/:id` | Delete review |

---

## 🎯 Features Checklist

### Rooms
- [x] List rooms with pagination
- [x] Create room
- [x] Edit room
- [x] Delete room
- [x] Upload images
- [x] Delete images
- [x] Set primary image
- [x] Search rooms
- [x] Filter by status

### Bookings
- [x] List all bookings
- [x] View booking details
- [x] Update payment status
- [x] Filter by booking status
- [x] Filter by payment status
- [x] Search bookings

### Users
- [x] List all users
- [x] Create user
- [x] Edit user
- [x] Delete user
- [x] Change user role
- [x] Search users
- [x] Filter by role

### Reviews
- [x] List all reviews
- [x] View review details
- [x] Delete review
- [x] Filter by room
- [x] Filter by rating

### UI/UX
- [x] Responsive design
- [x] Dark/Light theme
- [x] Loading skeletons
- [x] Toast notifications
- [x] Modal animations
- [x] Form validations
- [x] Error handling
- [x] Confirmation dialogs

---

## 🚀 Quick Start

### Access Admin Dashboard

1. **Login as Admin**:
   ```
   Username: admin (create via backend or database)
   Password: your_password
   ```

2. **Navigate**: Click "Admin Dashboard" in navbar

3. **Explore**:
   - Dashboard overview
   - Manage rooms
   - View bookings
   - Manage users
   - Moderate reviews

---

## 🔒 Security

**Implemented**:
- ✅ JWT token authentication
- ✅ Role-based access control
- ✅ Admin-only routes
- ✅ Protected API endpoints
- ✅ Input validation
- ✅ XSS prevention (React escaping)

**Recommendations**:
- Add CSRF protection
- Implement rate limiting
- Add audit logs
- Enable 2FA for admin accounts
- Regular security audits

---

## 📝 Notes

### Backend Integration

All admin components are **fully integrated** with backend endpoints. Pastikan backend running di `http://127.0.0.1:9000`.

### Error Handling

Semua API calls memiliki error handling dengan toast notifications untuk user feedback.

### Data Validation

Form validation dilakukan di frontend sebelum submit, dan backend juga melakukan validation.

### Performance

- Pagination untuk large datasets
- Skeleton loading states
- Optimistic UI updates
- Debounced search inputs

---

## 🐛 Troubleshooting

### Admin Dashboard Not Accessible

**Problem**: Redirect ke login atau home

**Solution**:
1. Verify user role is `admin` (lowercase)
2. Check JWT token contains correct role
3. Clear localStorage and login again
4. Check browser console for errors

### API Errors

**Problem**: 401 Unauthorized

**Solution**:
1. Check token valid
2. Verify token not expired
3. Check Authorization header present
4. Re-login if needed

**Problem**: 403 Forbidden

**Solution**:
1. Verify user has admin role
2. Check backend role validation
3. Ensure endpoint requires admin role

---

## ✅ Status

**Implementation**: ✅ **COMPLETE**

All admin features are implemented and integrated with backend:
- ✅ Room Management (CRUD + Images)
- ✅ Booking Management (View + Update Payment)
- ✅ User Management (CRUD + Role Change)
- ✅ Review Management (View + Delete)
- ✅ Dashboard Overview
- ✅ Responsive UI
- ✅ Dark/Light Theme
- ✅ Loading States
- ✅ Error Handling

**Ready for Production**: Yes (with security recommendations)

---

**Last Updated**: 2025-11-26
**Version**: 1.0.0
**Maintainer**: Development Team
