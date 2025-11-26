package services

import (
	"backend/internal/domain/models"
	"backend/internal/domain/repositories"
	"errors"
	"math"

	"github.com/araddon/dateparse"
	"gorm.io/gorm"
)

type bookingServiceImpl struct {
	bookingRepo repositories.BookingRepository
	roomRepo    repositories.RoomRepository
	reviewRepo  repositories.ReviewRepository
}

func NewBookingService(bRepo repositories.BookingRepository, rRepo repositories.RoomRepository, revRepo repositories.ReviewRepository) BookingService {
	return &bookingServiceImpl{bookingRepo: bRepo, roomRepo: rRepo, reviewRepo: revRepo}
}

// Helper: calculateTotalPrice menghitung total harga berdasarkan hari
func calculateTotalPrice(pricePerNight float64, checkInStr, checkOutStr string) (float64, error) {
	in, errIn := dateparse.ParseAny(checkInStr)
	out, errOut := dateparse.ParseAny(checkOutStr)

	if errIn != nil || errOut != nil {
		return 0, errors.New("format tanggal check-in/out tidak valid")
	}

	// Hitung durasi hari
	duration := out.Sub(in)
	days := math.Ceil(duration.Hours() / 24)

	// Minimal 1 malam jika check-out > check-in
	if days < 1 {
		return 0, errors.New("durasi pemesanan minimal 1 malam")
	}

	return pricePerNight * days, nil
}

// -------------------------------------------------------------------------
// --- OPERASI MEMBER ---
// -------------------------------------------------------------------------

// CreateBooking: Logika terberat: cek overlap, hitung harga, simpan
func (s *bookingServiceImpl) CreateBooking(booking *models.Booking) (*models.Booking, error) {
	// 1. Validasi Keberadaan Kamar dan Harga
	room, err := s.roomRepo.FindByID(booking.RoomID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("kamar tidak ditemukan")
		}
		return nil, err
	}

	// 2. Cek Overlap (Fitur Pencegahan Double Booking)
	isOverlap, err := s.bookingRepo.CheckOverlap(booking.RoomID, booking.CheckInDate.Format("2006-01-02"), booking.CheckOutDate.Format("2006-01-02"))
	if err != nil {
		return nil, err
	}
	if isOverlap {
		return nil, errors.New("kamar sudah dibooking pada periode tersebut")
	}

	// 3. Hitung Total Harga
	totalPrice, err := calculateTotalPrice(room.Price, booking.CheckInDate.Format("2006-01-02"), booking.CheckOutDate.Format("2006-01-02"))
	if err != nil {
		return nil, err
	}
	booking.TotalPrice = totalPrice

	// 4. Set Status Default
	booking.PaymentStatus = models.StatusPending
	booking.BookingStatus = models.StatusConfirmed

	// 5. Simpan Transaksi
	if err := s.bookingRepo.Create(booking); err != nil {
		return nil, err
	}
	return booking, nil
}

// GetUserBookings: Mengambil riwayat pemesanan member
func (s *bookingServiceImpl) GetUserBookings(userID uint, pagination *models.Pagination) ([]models.Booking, error) {
	return s.bookingRepo.FindByUserID(userID, pagination)
}

// CancelBooking: Membatalkan pemesanan oleh member
func (s *bookingServiceImpl) CancelBooking(bookingID uint, userID uint) error {
	booking, err := s.bookingRepo.FindByID(bookingID)
	if err != nil {
		return errors.New("booking tidak ditemukan")
	}

	// Logika Bisnis: Hanya user yang bersangkutan yang boleh membatalkan
	if booking.UserID != userID {
		return errors.New("anda tidak memiliki izin membatalkan pemesanan ini")
	}

	// Logika Bisnis: Hanya boleh dibatalkan jika statusnya belum Completed atau sudah Cancelled
	if booking.BookingStatus == models.StatusCompleted {
		return errors.New("pemesanan yang sudah selesai tidak dapat dibatalkan")
	}

	if booking.BookingStatus == models.StatusCancelled {
		return errors.New("pemesanan sudah dibatalkan sebelumnya")
	}

	// Update status ke cancelled
	return s.bookingRepo.UpdateStatus(bookingID, models.StatusCancelled)
}

// DeleteBooking: Menghapus booking yang cancelled dan belum dibayar
func (s *bookingServiceImpl) DeleteBooking(bookingID uint, userID uint) error {
	booking, err := s.bookingRepo.FindByID(bookingID)
	if err != nil {
		return errors.New("booking tidak ditemukan")
	}

	// Hanya user yang bersangkutan yang boleh menghapus
	if booking.UserID != userID {
		return errors.New("anda tidak memiliki izin menghapus pemesanan ini")
	}

	// Hanya bisa dihapus jika status cancelled
	if booking.BookingStatus != models.StatusCancelled {
		return errors.New("hanya booking yang cancelled yang bisa dihapus")
	}

	// Tidak bisa dihapus jika sudah dibayar
	if booking.PaymentStatus == models.StatusPaid {
		return errors.New("booking yang sudah dibayar tidak bisa dihapus")
	}

	// Hapus booking (soft delete)
	return s.bookingRepo.Delete(bookingID)
}

// -------------------------------------------------------------------------
// --- OPERASI ADMIN ---
// -------------------------------------------------------------------------

// GetAllBookings: Mengambil semua riwayat booking
func (s *bookingServiceImpl) GetAllBookings(pagination *models.Pagination) ([]models.Booking, error) {
	return s.bookingRepo.FindAll(pagination)
}

// GetBookingByID: Mengambil detail booking berdasarkan ID
func (s *bookingServiceImpl) GetBookingByID(bookingID uint) (*models.Booking, error) {
	return s.bookingRepo.FindByID(bookingID)
}

// UpdateBooking: Update booking data
func (s *bookingServiceImpl) UpdateBooking(booking *models.Booking) (*models.Booking, error) {
	if err := s.bookingRepo.Update(booking); err != nil {
		return nil, err
	}
	return booking, nil
}

// UpdatePaymentStatus: Mengubah status pembayaran (misalnya dari Pending ke Paid)
func (s *bookingServiceImpl) UpdatePaymentStatus(bookingID uint, newStatus string) (*models.Booking, error) {
	booking, err := s.bookingRepo.FindByID(bookingID)
	if err != nil {
		return nil, err
	}

	// Logika Bisnis: Update status pembayaran
	booking.PaymentStatus = newStatus
	if err := s.bookingRepo.Update(booking); err != nil {
		return nil, err
	}
	return booking, nil
}

// -------------------------------------------------------------------------
// --- FITUR ULASAN ---
// -------------------------------------------------------------------------

// CreateReview: Membuat ulasan (Fitur 3)
func (s *bookingServiceImpl) CreateReview(review *models.Review) (*models.Review, error) {
	// 1. Validasi: Pastikan Booking ID ada
	booking, err := s.bookingRepo.FindByID(review.BookingID)
	if err != nil {
		return nil, errors.New("booking terkait tidak ditemukan")
	}

	// 2. Validasi: Pastikan Booking sudah selesai (Completed)
	if booking.BookingStatus != models.StatusCompleted {
		return nil, errors.New("ulasan hanya dapat dibuat untuk pemesanan yang sudah selesai")
	}

	// 3. Validasi: Pastikan Rating antara 1 sampai 5
	if review.Rating < 1 || review.Rating > 5 {
		return nil, errors.New("rating harus antara 1 sampai 5")
	}

	// 4. Validasi: Pastikan hanya 1 review per booking
	if _, err := s.reviewRepo.FindByBookingID(review.BookingID); err == nil {
		return nil, errors.New("anda sudah memberikan ulasan untuk pemesanan ini")
	}

	// Set UserID dari Booking
	review.UserID = booking.UserID

	// 5. Simpan Review
	if err := s.reviewRepo.Create(review); err != nil {
		return nil, err
	}
	return review, nil
}
