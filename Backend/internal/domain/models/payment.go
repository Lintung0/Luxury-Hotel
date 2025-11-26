package models

import "gorm.io/gorm"

type Payment struct {
	gorm.Model
	BookingID     uint    `gorm:"not null"`
	Amount        float64 `gorm:"type:decimal(10,2);not null"`
	PaymentMethod string  `gorm:"type:varchar(50);not null"`
	Status        string  `gorm:"type:enum('pending', 'success', 'failed');default:'pending'"`
	TransactionID string  `gorm:"type:varchar(100);unique"`
}
