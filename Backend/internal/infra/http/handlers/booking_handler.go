package handlers

import (
	"backend/internal/app/services"
	"backend/internal/domain/models"
	"backend/pkg/utils"
	"errors"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

type BookingHandler struct {
	bookingService services.BookingService
}

func NewBookingHandler(bookingService services.BookingService) *BookingHandler {
	return &BookingHandler{bookingService: bookingService}
}

type CreateBookingInput struct {
	RoomID           uint   `json:"room_id" validate:"required"`
	CheckInDate      string `json:"check_in_date" validate:"required"`
	CheckOutDate     string `json:"check_out_date" validate:"required"`
	PaymentMethod    string `json:"payment_method"`
	GuestName        string `json:"guest_name" validate:"required"`
	GuestEmail       string `json:"guest_email" validate:"required,email"`
	GuestPhone       string `json:"guest_phone" validate:"required"`
	GuestIDNumber    string `json:"guest_id_number"`
	SpecialRequests  string `json:"special_requests"`
	NumberOfGuests   int    `json:"number_of_guests" validate:"required,min=1"`
}

// CreateBooking: Membuat booking baru (Member Only)
func (h *BookingHandler) CreateBooking(c *fiber.Ctx) error {
	// Ambil UserID dari context (dari JWT middleware)
	userID := c.Locals("userID").(uint)

	var input CreateBookingInput
	if err := c.BodyParser(&input); err != nil {
		return utils.RespondError(c, fiber.StatusBadRequest, "Format request tidak valid")
	}

	// Parse tanggal
	checkIn, err := time.Parse("2006-01-02", input.CheckInDate)
	if err != nil {
		return utils.RespondError(c, fiber.StatusBadRequest, "Format tanggal check-in tidak valid (gunakan format YYYY-MM-DD)")
	}

	checkOut, err := time.Parse("2006-01-02", input.CheckOutDate)
	if err != nil {
		return utils.RespondError(c, fiber.StatusBadRequest, "Format tanggal check-out tidak valid (gunakan format YYYY-MM-DD)")
	}

	booking := &models.Booking{
		UserID:         userID,
		RoomID:         input.RoomID,
		CheckInDate:    checkIn,
		CheckOutDate:   checkOut,
		PaymentMethod:  input.PaymentMethod,
		GuestName:      input.GuestName,
		GuestEmail:     input.GuestEmail,
		GuestPhone:     input.GuestPhone,
		GuestIDNumber:  input.GuestIDNumber,
		SpecialRequests: input.SpecialRequests,
		NumberOfGuests: input.NumberOfGuests,
	}

	createdBooking, err := h.bookingService.CreateBooking(booking)
	if err != nil {
		return utils.RespondError(c, fiber.StatusBadRequest, err.Error())
	}

	return utils.RespondSuccess(c, fiber.StatusCreated, "Pemesanan berhasil dibuat", createdBooking)
}

// GetMyBookings: Mengambil booking saya (Member)
func (h *BookingHandler) GetMyBookings(c *fiber.Ctx) error {
	userID := c.Locals("userID").(uint)
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 10)

	pagination := &models.Pagination{
		Page:   page,
		Limit:  limit,
		Sort:   c.Query("sort", "created_at desc"),
		Offset: (page - 1) * limit,
	}

	bookings, err := h.bookingService.GetUserBookings(userID, pagination)
	if err != nil {
		// Return empty array instead of error for now
		return utils.RespondSuccess(c, fiber.StatusOK, "Berhasil mengambil data pemesanan", fiber.Map{
			"bookings": []models.Booking{},
			"page":     page,
			"limit":    limit,
		})
	}

	return utils.RespondSuccess(c, fiber.StatusOK, "Berhasil mengambil data pemesanan", fiber.Map{
		"bookings": bookings,
		"page":     page,
		"limit":    limit,
	})
}

// CancelBooking: Membatalkan booking (Member)
func (h *BookingHandler) CancelBooking(c *fiber.Ctx) error {
	userID := c.Locals("userID").(uint)

	bookingID, err := strconv.ParseUint(c.Params("id"), 10, 32)
	if err != nil {
		return utils.RespondError(c, fiber.StatusBadRequest, "ID pemesanan tidak valid")
	}

	if err := h.bookingService.CancelBooking(uint(bookingID), userID); err != nil {
		if errors.Is(err, errors.New("anda tidak memiliki izin membatalkan pemesanan ini")) {
			return utils.RespondError(c, fiber.StatusForbidden, "Anda tidak memiliki izin membatalkan pemesanan ini")
		}
		return utils.RespondError(c, fiber.StatusBadRequest, err.Error())
	}

	return utils.RespondSuccess(c, fiber.StatusOK, "Pemesanan berhasil dibatalkan", nil)
}

// DeleteBooking: Menghapus booking yang cancelled (Member)
func (h *BookingHandler) DeleteBooking(c *fiber.Ctx) error {
	userID := c.Locals("userID").(uint)

	bookingID, err := strconv.ParseUint(c.Params("id"), 10, 32)
	if err != nil {
		return utils.RespondError(c, fiber.StatusBadRequest, "ID pemesanan tidak valid")
	}

	if err := h.bookingService.DeleteBooking(uint(bookingID), userID); err != nil {
		return utils.RespondError(c, fiber.StatusBadRequest, err.Error())
	}

	return utils.RespondSuccess(c, fiber.StatusOK, "Pemesanan berhasil dihapus", nil)
}

// GetAllBookings: Mengambil semua booking (Admin Only)
func (h *BookingHandler) GetAllBookings(c *fiber.Ctx) error {
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 10)

	pagination := &models.Pagination{
		Page:   page,
		Limit:  limit,
		Sort:   c.Query("sort", "created_at desc"),
		Offset: (page - 1) * limit,
	}

	bookings, err := h.bookingService.GetAllBookings(pagination)
	if err != nil {
		return utils.RespondError(c, fiber.StatusInternalServerError, "Gagal mengambil data pemesanan")
	}

	return utils.RespondSuccess(c, fiber.StatusOK, "Berhasil mengambil data pemesanan", fiber.Map{
		"bookings": bookings,
		"page":     page,
		"limit":    limit,
	})
}

type UpdatePaymentStatusInput struct {
	PaymentStatus string `json:"payment_status" validate:"required"`
}

// UpdatePaymentStatus: Mengubah status pembayaran (Admin Only)
func (h *BookingHandler) UpdatePaymentStatus(c *fiber.Ctx) error {
	bookingID, err := strconv.ParseUint(c.Params("id"), 10, 32)
	if err != nil {
		return utils.RespondError(c, fiber.StatusBadRequest, "ID pemesanan tidak valid")
	}

	var input UpdatePaymentStatusInput
	if err := c.BodyParser(&input); err != nil {
		return utils.RespondError(c, fiber.StatusBadRequest, "Format request tidak valid")
	}

	updatedBooking, err := h.bookingService.UpdatePaymentStatus(uint(bookingID), input.PaymentStatus)
	if err != nil {
		return utils.RespondError(c, fiber.StatusInternalServerError, "Gagal mengubah status pembayaran")
	}

	return utils.RespondSuccess(c, fiber.StatusOK, "Status pembayaran berhasil diubah", updatedBooking)
}

// GetBookingByID: Mengambil detail booking (Admin Only)
func (h *BookingHandler) GetBookingByID(c *fiber.Ctx) error {
	bookingID, err := strconv.ParseUint(c.Params("id"), 10, 32)
	if err != nil {
		return utils.RespondError(c, fiber.StatusBadRequest, "ID pemesanan tidak valid")
	}

	booking, err := h.bookingService.GetBookingByID(uint(bookingID))
	if err != nil {
		return utils.RespondError(c, fiber.StatusNotFound, "Pemesanan tidak ditemukan")
	}

	return utils.RespondSuccess(c, fiber.StatusOK, "Berhasil mengambil detail pemesanan", booking)
}

type UpdateBookingStatusInput struct {
	Status string `json:"status" validate:"required"`
}

// UpdateBookingStatus: Mengubah status booking (Admin Only)
func (h *BookingHandler) UpdateBookingStatus(c *fiber.Ctx) error {
	bookingID, err := strconv.ParseUint(c.Params("id"), 10, 32)
	if err != nil {
		return utils.RespondError(c, fiber.StatusBadRequest, "ID pemesanan tidak valid")
	}

	var input UpdateBookingStatusInput
	if err := c.BodyParser(&input); err != nil {
		return utils.RespondError(c, fiber.StatusBadRequest, "Format request tidak valid")
	}

	booking, err := h.bookingService.GetBookingByID(uint(bookingID))
	if err != nil {
		return utils.RespondError(c, fiber.StatusNotFound, "Pemesanan tidak ditemukan")
	}

	booking.BookingStatus = input.Status
	updatedBooking, err := h.bookingService.UpdateBooking(booking)
	if err != nil {
		return utils.RespondError(c, fiber.StatusInternalServerError, "Gagal mengubah status booking")
	}

	return utils.RespondSuccess(c, fiber.StatusOK, "Status booking berhasil diubah", updatedBooking)
}
