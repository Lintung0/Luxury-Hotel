# 🧪 Quick Test Guide - Review Feature

## 🚀 CARA CEPAT TEST FITUR REVIEW

### **PERSIAPAN:**

#### 1. **Pastikan Backend Running**
```bash
cd Backend
./myhotel
# Backend should run on port 9000
```

#### 2. **Pastikan Frontend Running**
```bash
cd Frontend
npm run dev
# Frontend should run on port 3000
```

#### 3. **Buka Browser**
```
http://localhost:3000
```

---

## 📝 TEST SCENARIO 1: Complete Flow (Recommended)

### **Step 1: Login as Member**
```
1. Klik "Login" di navbar
2. Username: member
3. Password: member123
4. Klik "Login"
```

### **Step 2: Create Booking**
```
1. Klik "Rooms" di navbar
2. Pilih room mana saja
3. Klik "View Details"
4. Isi form booking:
   - Check-in: Pilih tanggal hari ini
   - Check-out: Pilih tanggal besok
   - Number of Guests: 1
   - Guest Name: John Doe
   - Guest Email: john@example.com
   - Guest Phone: +62 812 3456 7890
5. Klik "Book Now"
6. Akan redirect ke "My Bookings"
```

### **Step 3: Pay for Booking**
```
1. Di "My Bookings", lihat booking yang baru dibuat
2. Klik tombol "Pay Now"
3. Modal payment akan muncul
4. Pilih payment method (Credit Card/Bank Transfer/etc)
5. Klik "Pay Now"
6. Status payment akan berubah jadi "paid"
```

### **Step 4: Mark as Completed (Admin)**
```
1. Logout dari member
2. Login as admin:
   - Username: admin
   - Password: admin123
3. Klik "Bookings" di sidebar
4. Cari booking yang baru dibuat
5. Klik "View Details"
6. Di dropdown "Update Status", pilih "completed"
7. Klik "Update Status"
8. Booking status sekarang "completed"
```

### **Step 5: Write Review (Member)**
```
1. Logout dari admin
2. Login kembali as member
3. Klik "My Reviews" di navbar
4. Akan muncul booking yang sudah completed di section "✍️ Write a Review"
5. Klik tombol "Write Review"
6. Modal akan muncul
7. Pilih rating (klik bintang 1-5)
8. Tulis comment: "Great room! Very clean and comfortable."
9. Klik "Submit Review"
10. Review akan muncul di section "📝 My Past Reviews"
```

### **Step 6: Verify Review (Admin)**
```
1. Logout dari member
2. Login as admin
3. Klik "Reviews" di sidebar
4. Review yang baru dibuat akan muncul
5. Bisa delete jika perlu
```

---

## ⚡ TEST SCENARIO 2: Quick Test (Using Existing Data)

### **Jika Sudah Ada Booking Completed:**

```
1. Login as member
2. Klik "My Reviews"
3. Jika ada booking completed, akan muncul di "Write a Review"
4. Klik "Write Review"
5. Isi rating & comment
6. Submit
7. Done!
```

---

## 🔍 WHAT TO CHECK

### **✅ My Reviews Page:**
- [ ] Page loads without error
- [ ] Shows "Write a Review" section if ada completed bookings
- [ ] Shows "My Past Reviews" section
- [ ] Shows correct booking information
- [ ] "Write Review" button works

### **✅ Review Modal:**
- [ ] Modal opens when click "Write Review"
- [ ] Shows booking details (ID, Room)
- [ ] Star rating works (click to select)
- [ ] Selected stars turn yellow
- [ ] Comment textarea works
- [ ] Character counter updates
- [ ] Cancel button closes modal
- [ ] Submit button works

### **✅ After Submit:**
- [ ] Success message appears
- [ ] Modal closes automatically
- [ ] Review appears in "My Past Reviews"
- [ ] Booking removed from "Write a Review"
- [ ] Shows correct rating (stars)
- [ ] Shows correct comment
- [ ] Shows booking ID
- [ ] Shows date created

### **✅ Admin View:**
- [ ] Admin can see all reviews
- [ ] Shows user ID
- [ ] Shows booking ID
- [ ] Shows rating & comment
- [ ] Delete button works
- [ ] Confirmation dialog appears
- [ ] Review deleted successfully

---

## 🐛 TROUBLESHOOTING

### **Problem: No bookings to review**
**Solution:**
1. Create a new booking
2. Pay for it
3. Login as admin
4. Mark booking as "completed"
5. Login back as member
6. Go to My Reviews

### **Problem: "Failed to submit review"**
**Possible Causes:**
1. Booking not completed yet
2. Already reviewed this booking
3. Not logged in
4. Backend not running
5. Network error

**Solution:**
1. Check booking status (must be "completed")
2. Check if already reviewed
3. Check browser console for errors
4. Check backend logs: `tail -f /tmp/backend_live.log`

### **Problem: Review not appearing**
**Solution:**
1. Refresh the page
2. Check browser console
3. Check backend response
4. Verify review was saved in database

### **Problem: Cannot click stars**
**Solution:**
1. Make sure modal is fully loaded
2. Try clicking different stars
3. Check browser console for errors

---

## 📊 EXPECTED RESULTS

### **Success Indicators:**
```
✅ Modal opens smoothly
✅ Stars are clickable and change color
✅ Comment can be typed
✅ Submit button shows loading state
✅ Success alert appears
✅ Modal closes automatically
✅ Review appears in list immediately
✅ Booking removed from "Write a Review"
✅ No errors in console
✅ Backend logs show 201 Created
```

### **API Responses:**

#### Create Review Success:
```
POST /api/reviews
Status: 201 Created
Response: {
  "success": true,
  "message": "Review created successfully",
  "data": { ... }
}
```

#### Get My Reviews Success:
```
GET /api/member/reviews
Status: 200 OK
Response: {
  "success": true,
  "data": {
    "reviews": [ ... ]
  }
}
```

---

## 🎯 QUICK VERIFICATION

### **1 Minute Test:**
```
1. Login as member
2. Go to My Reviews
3. If no completed bookings:
   - Create booking → Pay → Admin mark completed
4. Click "Write Review"
5. Select 5 stars
6. Type "Test review"
7. Click Submit
8. ✅ Review should appear immediately
```

---

## 📸 SCREENSHOTS TO VERIFY

### **Before Review:**
- [ ] "Write a Review" section shows completed booking
- [ ] "My Past Reviews" is empty or shows old reviews

### **During Review:**
- [ ] Modal is open
- [ ] Stars are visible
- [ ] Comment textarea is empty
- [ ] Submit button is enabled

### **After Review:**
- [ ] Modal is closed
- [ ] Review appears in "My Past Reviews"
- [ ] Booking removed from "Write a Review"
- [ ] Shows correct rating and comment

---

## 🔧 DEVELOPER TOOLS

### **Check API Calls (Browser Console):**
```javascript
// Network tab should show:
GET /api/member/bookings - 200 OK
GET /api/member/reviews - 200 OK
POST /api/reviews - 201 Created
```

### **Check Backend Logs:**
```bash
tail -f /tmp/backend_live.log

# Should see:
# POST /api/reviews | 201
# GET /api/member/reviews | 200
```

### **Check Database (Optional):**
```sql
SELECT * FROM reviews ORDER BY created_at DESC LIMIT 5;
-- Should show newly created review
```

---

## ✅ FINAL CHECKLIST

- [ ] Backend running on port 9000
- [ ] Frontend running on port 3000
- [ ] Can login as member
- [ ] Can access My Reviews page
- [ ] Can see completed bookings
- [ ] Can open review modal
- [ ] Can select rating
- [ ] Can type comment
- [ ] Can submit review
- [ ] Review appears immediately
- [ ] No errors in console
- [ ] Admin can see review
- [ ] Admin can delete review

---

**If all checks pass: ✅ FEATURE WORKING PERFECTLY!**

**Last Updated**: 26 November 2025
