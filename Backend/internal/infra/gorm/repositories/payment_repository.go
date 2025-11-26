package repositories

import (
	"backend/internal/domain/models"
	"gorm.io/gorm"
)

type PaymentRepositoryImpl struct {
	db *gorm.DB
}

func NewPaymentRepository(db *gorm.DB) *PaymentRepositoryImpl {
	return &PaymentRepositoryImpl{db: db}
}

func (r *PaymentRepositoryImpl) Create(payment *models.Payment) error {
	return r.db.Create(payment).Error
}

func (r *PaymentRepositoryImpl) GetByID(id uint) (*models.Payment, error) {
	var payment models.Payment
	err := r.db.First(&payment, id).Error
	return &payment, err
}

func (r *PaymentRepositoryImpl) GetByBookingID(bookingID uint) (*models.Payment, error) {
	var payment models.Payment
	err := r.db.Where("booking_id = ?", bookingID).First(&payment).Error
	return &payment, err
}

func (r *PaymentRepositoryImpl) Update(payment *models.Payment) error {
	return r.db.Save(payment).Error
}
