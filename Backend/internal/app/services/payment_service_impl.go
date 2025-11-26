package services

import (
	"fmt"
	"backend/internal/domain/models"
	"backend/internal/domain/repositories"
	"time"
)

type PaymentServiceImpl struct {
	paymentRepo repositories.PaymentRepository
	bookingRepo repositories.BookingRepository
}

func NewPaymentService(paymentRepo repositories.PaymentRepository, bookingRepo repositories.BookingRepository) *PaymentServiceImpl {
	return &PaymentServiceImpl{
		paymentRepo: paymentRepo,
		bookingRepo: bookingRepo,
	}
}

func (s *PaymentServiceImpl) CreatePayment(bookingID uint, paymentMethod string) (*models.Payment, error) {
	booking, err := s.bookingRepo.FindByID(bookingID)
	if err != nil {
		return nil, err
	}

	payment := &models.Payment{
		BookingID:     bookingID,
		Amount:        booking.TotalPrice,
		PaymentMethod: paymentMethod,
		Status:        "pending",
		TransactionID: fmt.Sprintf("TRX-%d-%d", bookingID, time.Now().Unix()),
	}

	if err := s.paymentRepo.Create(payment); err != nil {
		return nil, err
	}

	return payment, nil
}

func (s *PaymentServiceImpl) ProcessPayment(paymentID uint) error {
	payment, err := s.paymentRepo.GetByID(paymentID)
	if err != nil {
		return err
	}

	payment.Status = "success"
	if err := s.paymentRepo.Update(payment); err != nil {
		return err
	}

	booking, err := s.bookingRepo.FindByID(payment.BookingID)
	if err != nil {
		return err
	}

	booking.PaymentStatus = "paid"
	return s.bookingRepo.Update(booking)
}

func (s *PaymentServiceImpl) GetPaymentByBookingID(bookingID uint) (*models.Payment, error) {
	return s.paymentRepo.GetByBookingID(bookingID)
}
