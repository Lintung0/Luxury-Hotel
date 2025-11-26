# Admin Features - Complete Documentation

## 🎯 ADMIN REVIEW MANAGEMENT

### Features
✅ **View All Reviews**
- Display all reviews from all users
- Show rating (1-5 stars)
- Show user ID and booking ID
- Show review comment

✅ **Delete Reviews**
- Delete inappropriate or spam reviews
- Confirmation dialog before deletion
- Auto-refresh after deletion

### API Endpoints
```
GET    /api/reviews              - Get all reviews (public)
DELETE /api/admin/reviews/:id    - Delete review (admin only)
```

### How to Use
1. Login as admin
2. Navigate to "Reviews" in sidebar
3. View all reviews with ratings and comments
4. Click "Delete" button to remove review
5. Confirm deletion in dialog

### UI Features
- Color-coded star ratings (⭐)
- User ID and Booking ID display
- Responsive card layout
- Empty state when no reviews
- Total review count

---

## 👥 ADMIN USER MANAGEMENT

### Features
✅ **View All Users**
- Display all registered users
- Show user details (ID, username, full name, email, role)
- Filter by role (All, Admins, Members)
- Total user count per filter

✅ **Delete Users**
- Delete member accounts
- Admin accounts are protected (cannot be deleted)
- Confirmation dialog with username
- Auto-refresh after deletion

✅ **Filter Users**
- All users
- Admins only
- Members only
- Real-time count per filter

### API Endpoints
```
GET    /api/admin/users          - Get all users (admin only)
DELETE /api/admin/users/:id      - Delete user (admin only, cannot delete admins)
```

### How to Use
1. Login as admin
2. Navigate to "Users" in sidebar
3. Use filter buttons to view specific roles
4. Click "Delete" to remove member accounts
5. Admin accounts show "Protected" status

### UI Features
- Role badges (color-coded)
  - Purple badge for Admins
  - Blue badge for Members
- Filter buttons with counts
- Protected admin accounts
- Hover effects on table rows
- Empty state when no users
- Loading spinner

### Security
- Only admins can access
- Cannot delete admin accounts
- Confirmation required before deletion
- JWT token validation

---

## 📊 ADMIN DASHBOARD

### Statistics Cards
1. **Total Bookings** - Count of all bookings
2. **Total Revenue** - Sum of all booking prices
3. **Pending Payments** - Count of unpaid bookings
4. **Active Bookings** - Count of confirmed bookings

### Quick Actions
- 🏨 Manage Rooms
- 📅 View Bookings
- 👥 Manage Users
- ⭐ View Reviews

### API Used
```
GET /api/admin/bookings - To calculate statistics
```

---

## 🏨 ADMIN ROOM MANAGEMENT

### Features
✅ **View All Rooms**
✅ **Create New Room**
✅ **Update Room Details**
✅ **Delete Room**

### Room Fields
- Room Number
- Type (Standard, Deluxe, Suite)
- Price per night
- Description
- Max Occupancy

---

## 📅 ADMIN BOOKING MANAGEMENT

### Features
✅ **View All Bookings**
- From all users
- With pagination
- Sortable by date

✅ **View Booking Details**
- Guest information
- Room information
- Booking period
- Pricing details
- Status information

✅ **Update Booking Status**
- Pending
- Confirmed
- Cancelled
- Completed

✅ **Update Payment Status**
- Pending
- Paid
- Failed
- Refunded

### Status Colors
- 🟢 Green: Confirmed, Paid
- 🟡 Yellow: Pending
- 🔴 Red: Cancelled, Failed
- 🔵 Blue: Completed, Refunded

---

## 🔐 ADMIN ACCESS

### Default Admin Account
```
Username: admin
Password: admin123
```

### How to Login
1. Go to Login page
2. Enter admin credentials
3. System detects admin role
4. Redirects to Admin Dashboard
5. Access all admin features via sidebar

### Admin Routes
```
/admin/dashboard
/admin/rooms
/admin/bookings
/admin/users
/admin/reviews
```

---

## 🎨 UI/UX FEATURES

### Common Features
- Dark mode support
- Responsive design
- Loading states
- Empty states
- Error handling
- Toast notifications
- Confirmation dialogs
- Hover effects
- Color-coded badges

### Color Scheme
- Gold (#d4af37) - Primary actions
- Purple - Admin role
- Blue - Member role
- Green - Success/Confirmed
- Yellow - Pending/Warning
- Red - Error/Cancelled

---

## 🔧 TECHNICAL DETAILS

### Backend
```go
// Review Handler
func (h *ReviewHandler) GetAllReviews(c *fiber.Ctx) error
func (h *ReviewHandler) GetMyReviews(c *fiber.Ctx) error
func (h *ReviewHandler) DeleteReview(c *fiber.Ctx) error

// User Handler
func (h *UserHandler) GetAllUsers(c *fiber.Ctx) error
func (h *UserHandler) DeleteUser(c *fiber.Ctx) error
```

### Frontend Components
```
AdminReviews.jsx    - Review management
AdminUsers.jsx      - User management
AdminDashboard.jsx  - Statistics dashboard
AdminBookings.jsx   - Booking management
AdminRooms.jsx      - Room management
```

### State Management
- React useState for local state
- useEffect for data fetching
- Context API for auth state
- Axios for API calls

---

## 📝 TESTING CHECKLIST

### Review Management
- [ ] View all reviews
- [ ] See correct rating stars
- [ ] See user and booking IDs
- [ ] Delete review successfully
- [ ] Confirmation dialog works
- [ ] Page refreshes after delete
- [ ] Empty state shows when no reviews

### User Management
- [ ] View all users
- [ ] Filter by All/Admins/Members
- [ ] See correct user counts
- [ ] Delete member account
- [ ] Cannot delete admin account
- [ ] Confirmation dialog works
- [ ] Page refreshes after delete
- [ ] Empty state shows when filtered

### Dashboard
- [ ] Statistics show correct numbers
- [ ] Quick action links work
- [ ] Responsive on mobile
- [ ] Dark mode works

---

## 🚀 DEPLOYMENT NOTES

### Environment Variables
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=hotel_db
JWT_SECRET=your-secret-key
PORT=9000
```

### Database Tables Required
- users
- bookings
- reviews
- rooms
- payments

### Permissions
- Admin role required for all admin endpoints
- JWT middleware validates tokens
- Role middleware checks admin role

---

## 📞 SUPPORT

### Common Issues

**Issue**: Cannot access admin pages
**Solution**: Make sure you're logged in as admin (role = 'admin')

**Issue**: Reviews not showing
**Solution**: Check if there are any reviews in database

**Issue**: Cannot delete user
**Solution**: Cannot delete admin accounts (by design)

**Issue**: Statistics showing 0
**Solution**: Create some bookings first

---

## ✅ COMPLETED FEATURES

- [x] Admin Dashboard with statistics
- [x] Review Management (View, Delete)
- [x] User Management (View, Delete, Filter)
- [x] Booking Management (View, Update Status)
- [x] Room Management (CRUD)
- [x] Dark mode support
- [x] Responsive design
- [x] Loading states
- [x] Error handling
- [x] Confirmation dialogs

---

**Last Updated**: 2025-11-26
**Status**: ✅ Fully Functional
