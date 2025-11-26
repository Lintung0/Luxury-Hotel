package services

import "backend/internal/domain/models"

type UserService interface {
	GetUserProfile(userID uint) (*models.User, error)
	UpdateUserProfile(userID uint, fullName, email, username string) (*models.User, error)

	// Admin-only methods
	GetAllUsers(pagination *models.Pagination) ([]models.User, int64, error)
	GetUserByID(userID uint) (*models.User, error)
	CreateUserByAdmin(user *models.User) (*models.User, error)
	UpdateUserByAdmin(userID uint, fullName, email, username, role string) (*models.User, error)
	DeleteUserByAdmin(userID uint) error
}
