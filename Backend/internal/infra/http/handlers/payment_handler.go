package handlers

import (
	"backend/internal/app/services"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type PaymentHandler struct {
	paymentService services.PaymentService
}

func NewPaymentHandler(paymentService services.PaymentService) *PaymentHandler {
	return &PaymentHandler{paymentService: paymentService}
}

func (h *PaymentHandler) CreatePayment(c *fiber.Ctx) error {
	var req struct {
		BookingID     uint   `json:"booking_id"`
		PaymentMethod string `json:"payment_method"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	payment, err := h.paymentService.CreatePayment(req.BookingID, req.PaymentMethod)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(payment)
}

func (h *PaymentHandler) ProcessPayment(c *fiber.Ctx) error {
	id, err := strconv.ParseUint(c.Params("id"), 10, 32)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid payment ID"})
	}

	if err := h.paymentService.ProcessPayment(uint(id)); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"message": "Payment processed successfully"})
}

func (h *PaymentHandler) GetPaymentByBooking(c *fiber.Ctx) error {
	bookingID, err := strconv.ParseUint(c.Params("booking_id"), 10, 32)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid booking ID"})
	}

	payment, err := h.paymentService.GetPaymentByBookingID(uint(bookingID))
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Payment not found"})
	}

	return c.JSON(payment)
}
