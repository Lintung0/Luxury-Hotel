package services

import "backend/internal/domain/models"

type PaymentService interface {
	CreatePayment(bookingID uint, paymentMethod string) (*models.Payment, error)
	ProcessPayment(paymentID uint) error
	GetPaymentByBookingID(bookingID uint) (*models.Payment, error)
}
