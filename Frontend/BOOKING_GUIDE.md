# 📖 Panduan Booking Kamar - Grand Luxury Hotel

## 🎯 Cara Member Memesan Kamar

### Step-by-Step Guide

---

## 1️⃣ **Browse Rooms**

### Akses Halaman Rooms
1. Buka website
2. Klik **"Rooms"** di navbar
3. Atau langsung ke: `http://localhost:3000/rooms`

### Lihat Daftar Kamar
- Semua kamar tersedia ditampilkan
- Informasi yang terlihat:
  - Foto kamar
  - Nama/Tipe kamar
  - Harga per malam
  - Kapasitas tamu
  - Status (Available/Booked)

---

## 2️⃣ **Pilih Kamar**

### Klik Kamar yang Diinginkan
1. Klik pada card kamar atau tombol **"View Details"**
2. Akan redirect ke: `/rooms/:id`

### Lihat Detail Kamar
Halaman detail menampilkan:
- **Gallery foto** kamar (multiple images)
- **Deskripsi** lengkap
- **Harga** per malam
- **Ukuran** kamar (m²)
- **Kapasitas** maksimal tamu
- **Tipe** kamar (Deluxe, Suite, Standard)
- **Amenities** (WiFi, AC, TV, dll)
- **Booking Form** (sidebar kanan)

---

## 3️⃣ **Isi Form Booking**

### Form Fields

**Check-in Date** *
- Pilih tanggal check-in
- Minimal: Hari ini
- Format: YYYY-MM-DD

**Check-out Date** *
- Pilih tanggal check-out
- Minimal: 1 hari setelah check-in
- Format: YYYY-MM-DD

**Number of Guests** *
- Pilih jumlah tamu
- Maksimal: Sesuai kapasitas kamar
- Default: Kapasitas kamar

**Special Requests** (Optional)
- Permintaan khusus
- Contoh: "Early check-in", "High floor", "Extra pillow"

### Informasi Otomatis

**Total Nights**
- Dihitung otomatis dari check-in & check-out
- Contoh: 3 nights

**Total Price**
- Dihitung otomatis: Nights × Price per night
- Ditampilkan dalam Rupiah
- Contoh: Rp 4,500,000

---

## 4️⃣ **Submit Booking**

### Jika Belum Login
1. Klik tombol **"Book Now"**
2. Redirect ke halaman **Login**
3. Login dengan username & password
4. Setelah login, kembali ke halaman room
5. Isi form booking lagi

### Jika Sudah Login
1. Klik tombol **"Book Now"**
2. Loading indicator muncul
3. Booking diproses di backend
4. Jika berhasil:
   - Redirect ke `/member/bookings`
   - Muncul notifikasi: "Booking created successfully!"
5. Jika gagal:
   - Error message ditampilkan
   - Form tetap terbuka untuk perbaikan

---

## 5️⃣ **Lihat Booking**

### My Bookings Page
URL: `/member/bookings`

**Informasi Booking**:
- Room Number
- Check-in Date
- Check-out Date
- Total Price
- Payment Status (Pending/Paid/Failed)
- Booking Status (Confirmed/Cancelled/Completed)

**Action Buttons**:
- **Pay Now** (jika payment pending)
- **Cancel Booking** (jika status confirmed)

---

## 6️⃣ **Bayar Booking**

### Payment Process

1. **Klik "Pay Now"** pada booking card
2. **Payment Modal** terbuka
3. **Pilih Payment Method**:
   - Credit Card
   - Bank Transfer
   - E-Wallet
4. **Klik "Pay Now"**
5. **Payment diproses**:
   - Payment record dibuat
   - Status diupdate ke "success"
   - Booking payment status → "paid"
6. **Konfirmasi**:
   - Toast notification: "Payment berhasil!"
   - Booking list refresh
   - Payment status badge berubah hijau

---

## 7️⃣ **Cancel Booking**

### Cancellation Process

1. **Klik "Cancel Booking"** pada booking card
2. **Confirmation dialog** muncul
3. **Confirm cancellation**
4. **Booking dibatalkan**:
   - Status berubah ke "cancelled"
   - Tidak bisa di-cancel lagi
5. **Notifikasi**: "Booking cancelled successfully"

---

## 📋 Backend API Flow

### Create Booking
```
POST /api/member/bookings
Authorization: Bearer <token>

Request:
{
  "room_id": 1,
  "check_in_date": "2025-11-27",
  "check_out_date": "2025-11-30",
  "payment_method": "cash"
}

Response:
{
  "success": true,
  "message": "Booking berhasil dibuat",
  "data": {
    "ID": 1,
    "RoomID": 1,
    "UserID": 2,
    "CheckInDate": "2025-11-27",
    "CheckOutDate": "2025-11-30",
    "TotalPrice": 4500000,
    "PaymentStatus": "pending",
    "BookingStatus": "confirmed"
  }
}
```

---

## ✅ Validation Rules

### Check-in Date
- ✅ Tidak boleh kosong
- ✅ Minimal hari ini
- ✅ Format: YYYY-MM-DD

### Check-out Date
- ✅ Tidak boleh kosong
- ✅ Minimal 1 hari setelah check-in
- ✅ Format: YYYY-MM-DD

### Guests
- ✅ Tidak boleh kosong
- ✅ Minimal: 1
- ✅ Maksimal: Kapasitas kamar

### Room Availability
- ✅ Room harus available
- ✅ Tidak ada booking overlap di tanggal yang sama

---

## 🎨 UI Elements

### Booking Form (Sidebar)
```
┌─────────────────────────┐
│  Book This Room         │
├─────────────────────────┤
│  Check-in Date *        │
│  [Date Picker]          │
│                         │
│  Check-out Date *       │
│  [Date Picker]          │
│                         │
│  Guests *               │
│  [Number Input]         │
│                         │
│  Special Requests       │
│  [Text Area]            │
├─────────────────────────┤
│  3 nights               │
│  Total: Rp 4,500,000    │
├─────────────────────────┤
│  [Book Now Button]      │
└─────────────────────────┘
```

### Booking Card (My Bookings)
```
┌─────────────────────────────────────┐
│  Room 101              [Confirmed]  │
│                    [Payment: Paid]  │
├─────────────────────────────────────┤
│  Check-in:  2025-11-27              │
│  Check-out: 2025-11-30              │
│  Total: Rp 4,500,000                │
├─────────────────────────────────────┤
│  [Pay Now]  [Cancel Booking]        │
└─────────────────────────────────────┘
```

---

## 🔍 Troubleshooting

### "Please login to book"
**Problem**: User belum login
**Solution**: Klik tombol, akan redirect ke login

### "Room not available"
**Problem**: Room sudah dibooking di tanggal tersebut
**Solution**: Pilih tanggal lain atau room lain

### "Invalid dates"
**Problem**: Check-out sebelum check-in
**Solution**: Pilih check-out setelah check-in

### "Guests exceed capacity"
**Problem**: Jumlah tamu melebihi kapasitas
**Solution**: Kurangi jumlah tamu atau pilih room lebih besar

### "Booking failed"
**Problem**: Error dari backend
**Solution**: 
- Cek koneksi internet
- Cek token masih valid
- Coba lagi atau refresh page

---

## 💡 Tips

### Best Practices
1. **Login dulu** sebelum browse rooms
2. **Cek availability** di kalender
3. **Baca deskripsi** dan amenities
4. **Lihat foto** semua angle
5. **Isi special requests** jika ada kebutuhan khusus
6. **Bayar segera** setelah booking
7. **Screenshot** konfirmasi booking

### Recommended Flow
```
Login → Browse Rooms → View Detail → 
Fill Form → Book → Pay → Enjoy Stay!
```

---

## 📞 Support

Jika ada masalah saat booking:
1. Cek browser console (F12) untuk error
2. Screenshot error message
3. Hubungi admin
4. Atau coba booking via admin dashboard

---

## ✅ Checklist Booking

- [ ] Login sebagai member
- [ ] Browse rooms di `/rooms`
- [ ] Pilih room yang diinginkan
- [ ] Lihat detail room
- [ ] Isi form booking:
  - [ ] Check-in date
  - [ ] Check-out date
  - [ ] Number of guests
  - [ ] Special requests (optional)
- [ ] Cek total price
- [ ] Klik "Book Now"
- [ ] Verifikasi redirect ke My Bookings
- [ ] Klik "Pay Now"
- [ ] Pilih payment method
- [ ] Konfirmasi payment
- [ ] Verifikasi status "paid"

---

**Happy Booking! 🎉**

---

**Last Updated**: 2025-11-26
**Version**: 1.0.0
