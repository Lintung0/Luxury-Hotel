package repositories

import "backend/internal/domain/models"

type PaymentRepository interface {
	Create(payment *models.Payment) error
	GetByID(id uint) (*models.Payment, error)
	GetByBookingID(bookingID uint) (*models.Payment, error)
	Update(payment *models.Payment) error
}
