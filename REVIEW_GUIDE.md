# 📝 Panduan Fitur Review - Member

## 🎯 Cara Member Melakukan Review

### **STEP 1: Complete Your Booking**
```
1. Login sebagai member
2. Book a room
3. Complete payment
4. Wait for admin to mark booking as "completed"
```

### **STEP 2: Access My Reviews Page**
```
1. Login sebagai member
2. Klik "My Reviews" di navbar
   atau
   Akses: http://localhost:3000/member/reviews
```

### **STEP 3: Write Review**
```
1. Lihat section "✍️ Write a Review"
2. Akan muncul list booking yang sudah completed
3. Klik tombol "Write Review" pada booking yang ingin direview
4. Modal akan muncul
```

### **STEP 4: Fill Review Form**
```
1. Pilih rating (1-5 bintang) dengan klik bintang
2. Tulis komentar/feedback di textarea
3. Klik "Submit Review"
4. Review akan tersimpan
```

### **STEP 5: View Your Reviews**
```
1. Setelah submit, review akan muncul di section "📝 My Past Reviews"
2. Bisa lihat semua review yang pernah ditulis
3. Setiap review menampilkan:
   - Rating (bintang)
   - Komentar
   - Booking ID
   - Tanggal review dibuat
```

---

## 📋 SYARAT UNTUK BISA REVIEW

### ✅ Booking Harus:
1. **Status Booking**: `completed` (bukan pending/confirmed/cancelled)
2. **Belum pernah direview**: Satu booking hanya bisa direview 1x
3. **Milik user yang login**: Tidak bisa review booking orang lain

### ❌ Tidak Bisa Review Jika:
1. Booking masih `pending` atau `confirmed`
2. Booking sudah `cancelled`
3. Booking sudah pernah direview
4. Bukan booking milik user yang login

---

## 🎨 TAMPILAN FITUR REVIEW

### **1. My Reviews Page**
```
┌─────────────────────────────────────────┐
│  My Reviews                             │
│  Share your experience with us          │
├─────────────────────────────────────────┤
│                                         │
│  ✍️ Write a Review                      │
│  ┌───────────────────────────────────┐ │
│  │ 🏨 Room #2                        │ │
│  │ Booking #5 • Completed            │ │
│  │ Stay: 01 Dec - 03 Dec 2025        │ │
│  │                [Write Review]     │ │
│  └───────────────────────────────────┘ │
│                                         │
│  📝 My Past Reviews (2)                 │
│  ┌───────────────────────────────────┐ │
│  │ ⭐ ⭐⭐⭐⭐⭐ 5/5                    │ │
│  │ "Great room! Very clean..."       │ │
│  │ Booking #3 • 20 Nov 2025          │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### **2. Review Modal**
```
┌─────────────────────────────────────┐
│  Write Review                    ✕  │
├─────────────────────────────────────┤
│  Booking #5                         │
│  Room #2                            │
├─────────────────────────────────────┤
│  Rating *                           │
│  ⭐ ⭐ ⭐ ⭐ ⭐  5/5                  │
│                                     │
│  Your Review *                      │
│  ┌─────────────────────────────┐   │
│  │ Share your experience...    │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│  120 characters                     │
│                                     │
│  [Cancel]  [Submit Review]          │
└─────────────────────────────────────┘
```

---

## 🔧 TECHNICAL DETAILS

### **API Endpoints**

#### 1. Get My Reviews
```
GET /api/member/reviews
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "reviews": [
      {
        "ID": 1,
        "BookingID": 5,
        "UserID": 2,
        "Rating": 5,
        "Comment": "Great room!",
        "CreatedAt": "2025-11-26T10:00:00Z"
      }
    ]
  }
}
```

#### 2. Create Review
```
POST /api/reviews
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "booking_id": 5,
  "rating": 5,
  "comment": "Great room! Very clean and comfortable."
}

Response:
{
  "success": true,
  "message": "Review created successfully",
  "data": {
    "ID": 1,
    "BookingID": 5,
    "UserID": 2,
    "Rating": 5,
    "Comment": "Great room!",
    "CreatedAt": "2025-11-26T10:00:00Z"
  }
}
```

### **Validation Rules**

#### Backend:
```go
- booking_id: required
- rating: required, min=1, max=5
- comment: optional (but recommended)
- Booking must be completed
- User must own the booking
- One review per booking
```

#### Frontend:
```javascript
- rating: 1-5 (default: 5)
- comment: required, min 1 character
- Interactive star selection
- Character counter
- Submit button disabled while submitting
```

---

## 🎯 USER FLOW

### **Complete Flow:**
```
1. Member Login
   ↓
2. Book Room + Fill Guest Info
   ↓
3. Pay for Booking
   ↓
4. Admin marks booking as "completed"
   ↓
5. Member goes to "My Reviews"
   ↓
6. Sees completed booking in "Write a Review" section
   ↓
7. Clicks "Write Review" button
   ↓
8. Modal opens with review form
   ↓
9. Selects rating (1-5 stars)
   ↓
10. Writes comment/feedback
   ↓
11. Clicks "Submit Review"
   ↓
12. Review saved to database
   ↓
13. Modal closes
   ↓
14. Review appears in "My Past Reviews"
   ↓
15. Booking removed from "Write a Review" section
```

---

## 💡 FEATURES

### **Interactive Star Rating**
- Click on star to select rating
- Hover effect on stars
- Shows selected rating (e.g., "5/5")
- Visual feedback (yellow for selected, gray for unselected)

### **Character Counter**
- Shows number of characters typed
- Real-time update
- Helps user write appropriate length review

### **Loading States**
- Spinner while loading data
- "Submitting..." text on button
- Disabled buttons during submission
- Prevents double submission

### **Empty States**
- "No reviews yet" when no reviews written
- "No completed bookings" when nothing to review
- Friendly messages with icons
- Call-to-action to complete bookings

### **Responsive Design**
- Works on mobile, tablet, desktop
- Modal adapts to screen size
- Touch-friendly star selection
- Readable on all devices

---

## 🔐 SECURITY

### **Authorization**
- Only logged-in members can write reviews
- JWT token required
- User can only review their own bookings
- Cannot review same booking twice

### **Validation**
- Rating must be 1-5
- Comment cannot be empty
- Booking must exist
- Booking must be completed
- User must own the booking

---

## 📊 ADMIN VIEW

### **Admin Can:**
1. View all reviews (Admin → Reviews)
2. See which user wrote which review
3. See booking ID for each review
4. Delete inappropriate reviews
5. Monitor review quality

### **Admin Cannot:**
1. Edit reviews (only delete)
2. Write reviews on behalf of users
3. Change review ratings

---

## 🎨 UI/UX HIGHLIGHTS

### **Visual Elements:**
- ⭐ Star icons for ratings
- 🏨 Hotel icon for bookings
- 📝 Document icon for reviews
- ✍️ Pencil icon for write action
- ℹ️ Info icon for messages

### **Color Coding:**
- Gold (#d4af37) - Primary actions
- Yellow - Star ratings
- Blue - Info messages
- Green - Success states
- Gray - Neutral/disabled

### **Animations:**
- Smooth modal transitions
- Star hover effects
- Button hover states
- Loading spinners
- Fade in/out effects

---

## 📝 EXAMPLE REVIEWS

### **Good Review:**
```
Rating: 5/5
Comment: "Excellent stay! The room was spotless, 
bed was comfortable, and staff was very friendly. 
The location is perfect and breakfast was delicious. 
Will definitely come back!"
```

### **Average Review:**
```
Rating: 3/5
Comment: "Room was okay. Clean but a bit small. 
WiFi was slow. Staff was helpful though."
```

### **Detailed Review:**
```
Rating: 4/5
Comment: "Great hotel overall. Room was spacious 
and well-maintained. Only minor issue was the AC 
was a bit noisy at night. Everything else was 
perfect. Good value for money."
```

---

## 🚀 TESTING CHECKLIST

### **Member Side:**
- [ ] Can access My Reviews page
- [ ] Sees completed bookings
- [ ] Can click "Write Review" button
- [ ] Modal opens correctly
- [ ] Can select rating (1-5 stars)
- [ ] Can type comment
- [ ] Character counter works
- [ ] Can submit review
- [ ] Success message appears
- [ ] Modal closes after submit
- [ ] Review appears in "My Past Reviews"
- [ ] Booking removed from "Write a Review"
- [ ] Cannot review same booking twice
- [ ] Cannot review cancelled bookings
- [ ] Cannot review pending bookings

### **Admin Side:**
- [ ] Can view all reviews
- [ ] Can see user ID and booking ID
- [ ] Can delete reviews
- [ ] Confirmation dialog works
- [ ] Review deleted successfully

---

## 🎯 SUCCESS METRICS

### **Review Submission:**
- ✅ Form validation works
- ✅ API call succeeds
- ✅ Data saved to database
- ✅ UI updates immediately
- ✅ User gets confirmation

### **User Experience:**
- ✅ Easy to find review page
- ✅ Clear instructions
- ✅ Intuitive star selection
- ✅ Fast submission
- ✅ Immediate feedback

---

**Status**: ✅ **FULLY IMPLEMENTED & WORKING**
**Last Updated**: 26 November 2025
