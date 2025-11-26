# Dokumentasi API MyHotel

Dokumentasi ini menyediakan daftar endpoint API untuk aplikasi MyHotel Backend.

**Base URL:** `/api`

---

##  маршруты общего пользования (Public Routes)

Endpoint ini dapat diakses tanpa autentikasi.

### Autentikasi (Auth)

*   **`POST /auth/register`**
    *   Fungsi: Mendaftarkan pengguna baru.
    *   Body: `{ "name": "...", "email": "...", "password": "..." }`

*   **`POST /auth/login`**
    *   Fungsi: Login pengguna dan mendapatkan token JWT.
    *   Body: `{ "email": "...", "password": "..." }`

### Kamar (Rooms)

*   **`GET /rooms`**
    *   Fungsi: Mendapatkan daftar semua kamar (disarankan untuk menambahkan paginasi).

*   **`GET /rooms/:id`**
    *   Fungsi: Mendapatkan detail satu kamar berdasarkan ID.

*   **`POST /rooms/available`**
    *   Fungsi: Mencari kamar yang tersedia berdasarkan kriteria tertentu (misalnya tanggal).
    *   Body: `{ "check_in_date": "...", "check_out_date": "..." }`

### Ulasan (Reviews)

*   **`GET /reviews/room/:roomId`**
    *   Fungsi: Mendapatkan semua ulasan untuk satu kamar tertentu.

*   **`GET /reviews/:id`**
    *   Fungsi: Mendapatkan detail satu ulasan berdasarkan ID.

---

## маршруты, требующие защиты (Protected Routes)

Endpoint ini memerlukan header `Authorization: Bearer <token>`.

### Rute Anggota (Member Routes)

Path Prefix: `/member`

#### Profil (Profile)

*   **`GET /member/profile`**
    *   Fungsi: Mendapatkan detail profil pengguna yang sedang login.

*   **`PUT /member/profile`**
    *   Fungsi: Memperbarui profil pengguna yang sedang login.

#### Pemesanan (Bookings)

*   **`POST /member/bookings`**
    *   Fungsi: Membuat pemesanan baru.

*   **`GET /member/bookings`**
    *   Fungsi: Mendapatkan riwayat pemesanan pengguna yang sedang login.

*   **`DELETE /member/bookings/:id`**
    *   Fungsi: Membatalkan pemesanan.

#### Ulasan (Reviews)

*   **`POST /member/reviews`**
    *   Fungsi: Membuat ulasan baru untuk kamar yang pernah dipesan.

---

## Rute Admin (Admin Routes)

Endpoint ini hanya bisa diakses oleh pengguna dengan peran 'admin'.

Path Prefix: `/admin`

### Manajemen Kamar (Room Management)

*   **`POST /admin/rooms`**: Membuat kamar baru.
*   **`PUT /admin/rooms/:id`**: Memperbarui detail kamar.
*   **`DELETE /admin/rooms/:id`**: Menghapus kamar.
*   **`POST /admin/rooms/:id/images`**: Menambahkan gambar ke kamar.
*   **`DELETE /admin/rooms/:id/images/:imageId`**: Menghapus gambar dari kamar.

### Manajemen Pemesanan (Booking Management)

*   **`GET /admin/bookings`**: Mendapatkan daftar semua pemesanan.
*   **`PUT /admin/bookings/:id/payment-status`**: Memperbarui status pembayaran pemesanan.

### Manajemen Ulasan (Review Management)

*   **`DELETE /admin/reviews/:id`**: Menghapus ulasan.

### Manajemen Pengguna (User Management)

*   **`GET /admin/users`**: Mendapatkan daftar semua pengguna.
*   **`POST /admin/users`**: Membuat pengguna baru (misalnya, admin lain).
*   **`GET /admin/users/:id`**: Mendapatkan detail satu pengguna.
*   **`PUT /admin/users/:id`**: Memperbarui detail pengguna.
*   **`DELETE /admin/users/:id`**: Menghapus pengguna.