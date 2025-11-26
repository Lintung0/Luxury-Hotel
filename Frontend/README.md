# Grand Luxury Hotel - Frontend

Modern luxury hotel booking application dengan dark/light theme toggle, payment system, dan admin dashboard.

## 🚀 Teknologi

- **React 18** dengan Vite
- **React Router v6** untuk routing
- **Axios** untuk HTTP requests
- **Context API** untuk state management (Auth, Theme, Toast)
- **TailwindCSS v4** untuk styling
- **react-icons** untuk icons

## 📁 Struktur Folder

```
src/
├── api/
│   ├── axios.js                 # Axios instance dengan interceptors
│   ├── authApi.js               # Auth endpoints
│   ├── roomApi.js               # Room endpoints
│   ├── bookingApi.js            # Booking endpoints
│   ├── reviewApi.js             # Review endpoints
│   ├── paymentApi.js            # Payment endpoints
│   └── adminApi/
│       ├── adminRoomApi.js
│       ├── adminBookingApi.js
│       ├── adminUserApi.js
│       └── adminReviewApi.js
├── components/
│   ├── layout/
│   │   └── Navbar.jsx           # Navigation dengan theme toggle
│   ├── ui/
│   │   ├── SkeletonBlock.jsx
│   │   ├── RoomCardSkeleton.jsx
│   │   ├── RoomDetailSkeleton.jsx
│   │   ├── BookingListSkeleton.jsx
│   │   ├── AdminTableSkeleton.jsx
│   │   ├── PageSkeleton.jsx
│   │   └── Toast.jsx
│   ├── rooms/
│   │   ├── RoomList.jsx
│   │   ├── RoomCard.jsx
│   │   └── RoomDetail.jsx
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── booking/
│   │   ├── BookingForm.jsx
│   │   ├── BookingCard.jsx
│   │   └── PaymentModal.jsx     # Payment processing
│   └── admin/
│       ├── AdminRooms.jsx
│       ├── AdminBookings.jsx
│       ├── AdminUsers.jsx
│       └── AdminReviews.jsx
├── context/
│   ├── ThemeContext.jsx         # Dark/Light theme dengan localStorage
│   ├── AuthContext.jsx          # Authentication state
│   └── ToastContext.jsx         # Toast notifications
├── layouts/
│   ├── MainLayout.jsx
│   └── AdminLayout.jsx
├── pages/
│   ├── Home.jsx
│   ├── Rooms.jsx
│   ├── RoomDetail.jsx
│   ├── Member/
│   │   └── MemberBookings.jsx
│   └── Admin/
│       └── AdminDashboard.jsx
├── router/
│   ├── AppRouter.jsx
│   ├── ProtectedRoute.jsx
│   ├── AdminRoute.jsx
│   └── MemberRoute.jsx
├── utils/
│   ├── auth.js                  # Token management
│   └── formatter.js             # Currency & date formatters
├── App.jsx
├── main.jsx
└── index.css
```

## 🎨 Theme System

### Default: Dark Mode
- Background: `#0f0f0f` → `#1a1a1a`
- Cards: `#1e1e1e` → `#2a2a2a`
- Text: `#ffffff` → `#e5e5e5`
- Gold accent: `#d4af37`
- Smooth transition: 300ms

### Light Mode
- Background: `#ffffff` → `#f8f9fa`
- Cards: white dengan shadow
- Text: `#1a1a1a` → `#2d2d2d`
- Gold accent: darker shade

Theme preference disimpan di localStorage dan persist setelah reload.

## 🔐 Authentication Flow

1. **Login**: POST `/api/auth/login` → simpan token & user
2. **Register**: POST `/api/auth/register`
3. **Auto-login**: Cek token di localStorage saat app load
4. **Protected Routes**: Redirect ke `/login` jika tidak authenticated
5. **Role-based Access**:
   - Admin: akses `/admin/*`
   - Member: akses `/member/*`

## 💳 Payment System

### Endpoints
- `POST /api/member/payments` - Create payment
- `GET /api/member/payments/booking/:booking_id` - Get payment by booking
- `POST /api/member/payments/:id/process` - Process payment

### Flow
1. User membuat booking
2. Booking status: `pending`, Payment status: `pending`
3. User klik "Pay Now" di BookingCard
4. Pilih payment method (Credit Card, Bank Transfer, E-Wallet)
5. Payment diproses → status berubah `success`
6. Booking payment status update ke `paid`

## 📡 API Endpoints

### Public
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/rooms`
- `GET /api/rooms/:id`
- `POST /api/rooms/available`
- `GET /api/reviews/room/:roomId`

### Member (prefix: `/api/member`)
- `GET /api/member/bookings` - List bookings
- `POST /api/member/bookings` - Create booking
- `DELETE /api/member/bookings/:id` - Cancel booking
- `POST /api/member/reviews` - Create review
- `POST /api/member/payments` - Create payment
- `POST /api/member/payments/:id/process` - Process payment

### Admin (prefix: `/api/admin`)
- `GET /api/admin/rooms` - List all rooms
- `POST /api/admin/rooms` - Create room
- `PUT /api/admin/rooms/:id` - Update room
- `DELETE /api/admin/rooms/:id` - Delete room
- `POST /api/admin/rooms/:id/images` - Add room image
- `DELETE /api/admin/rooms/images/:id` - Delete image
- `GET /api/admin/bookings` - List all bookings
- `PUT /api/admin/bookings/:id` - Update payment status
- `GET /api/admin/users` - List users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `DELETE /api/admin/reviews/:id` - Delete review

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Backend running di `http://127.0.0.1:9000`

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

Create `.env` file:
```env
VITE_API_BASE_URL=http://127.0.0.1:9000/api
```

### Build for Production

```bash
npm run build
```

## 🎯 Fitur Utama

### ✅ Implemented Features

- [x] Dark/Light theme toggle dengan persistence
- [x] JWT Authentication dengan auto-login
- [x] Role-based access control (Admin/Member)
- [x] Skeleton loading states di semua halaman
- [x] Toast notifications untuk feedback
- [x] Room browsing dengan filter
- [x] Booking management untuk member
- [x] Payment system (Create, Process)
- [x] Admin dashboard dengan CRUD operations:
  - [x] Room management
  - [x] Booking management
  - [x] User management
  - [x] Review management
- [x] Responsive design (mobile-friendly)
- [x] Glass-morphism cards dengan gold glow effect
- [x] Modal animations (slide-in)
- [x] Form validations
- [x] Error handling dengan user-friendly messages

### 🎨 UI/UX Features

- Modern luxury design
- Smooth transitions (300ms)
- Hover effects dengan gold glow
- Loading states dengan skeleton screens
- Modal slide-in animations
- Custom scrollbar (dark theme)
- Accessibility-friendly (focus states)

## 🐛 Troubleshooting

### Theme Toggle Tidak Bekerja

**Solusi**: Pastikan `tailwind.config.js` ada dan memiliki `darkMode: 'class'`:

```js
export default {
  darkMode: 'class',
  // ...
}
```

### API Errors

1. Cek backend running di `http://127.0.0.1:9000`
2. Cek CORS settings di backend
3. Cek token valid di localStorage
4. Lihat console untuk error details

### Build Errors

```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 Development Notes

### Axios Interceptors

- **Request**: Otomatis menambahkan `Authorization: Bearer <token>` header
- **Response**: Handle 401 → auto logout dan redirect ke login

### State Management

Menggunakan **Context API** karena:
- Lebih simple untuk aplikasi skala kecil-menengah
- Tidak perlu library tambahan
- Built-in React
- Cukup untuk auth, theme, dan toast state

Alternative: Zustand (jika butuh performance optimization untuk state complex)

### TailwindCSS v4 Setup

Menggunakan **@tailwindcss/vite** plugin:

```js
// vite.config.js
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()]
})
```

Config minimal di `tailwind.config.js` untuk custom colors dan dark mode.

## 🧪 Testing (Optional)

```bash
# Install testing dependencies
npm install -D @testing-library/react @testing-library/jest-dom jest

# Run tests
npm test
```

Example test untuk ThemeContext:
```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, useTheme } from './context/ThemeContext'

test('theme toggle works', () => {
  const TestComponent = () => {
    const { isDark, toggleTheme } = useTheme()
    return (
      <div>
        <span>{isDark ? 'dark' : 'light'}</span>
        <button onClick={toggleTheme}>Toggle</button>
      </div>
    )
  }

  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  )

  expect(screen.getByText('dark')).toBeInTheDocument()
  fireEvent.click(screen.getByText('Toggle'))
  expect(screen.getByText('light')).toBeInTheDocument()
})
```

## 📞 Support

Jika ada masalah atau pertanyaan, silakan buat issue atau hubungi tim development.

## 📄 License

Private - Grand Luxury Hotel © 2024
