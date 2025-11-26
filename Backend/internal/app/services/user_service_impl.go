package services

import (
	"backend/internal/domain/models"
	"backend/internal/domain/repositories"
	"errors"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type userServiceImpl struct {
	userRepo repositories.UserRepository
}

func NewUserService(userRepo repositories.UserRepository) UserService {
	return &userServiceImpl{userRepo: userRepo}
}

func (s *userServiceImpl) GetUserProfile(userID uint) (*models.User, error) {
	user, err := s.userRepo.FindByID(userID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("pengguna tidak ditemukan")
		}
		return nil, err
	}
	// Sembunyikan password
	user.Password = ""
	return user, nil
}

func (s *userServiceImpl) UpdateUserProfile(userID uint, fullName, email, username string) (*models.User, error) {
	user, err := s.userRepo.FindByID(userID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("pengguna tidak ditemukan")
		}
		return nil, err
	}

	// Update field jika ada isinya
	if fullName != "" {
		user.FullName = fullName
	}
	if email != "" {
		// Disini bisa ditambahkan validasi apakah email sudah dipakai user lain
		user.Email = email
	}
	if username != "" {
		// Disini bisa ditambahkan validasi apakah username sudah dipakai user lain
		user.Username = username
	}

	if err := s.userRepo.Update(user); err != nil {
		return nil, err
	}

	// Sembunyikan password sebelum dikembalikan
	user.Password = ""
	return user, nil
}

// --- Admin-only methods implementation ---

func (s *userServiceImpl) GetAllUsers(pagination *models.Pagination) ([]models.User, int64, error) {
	users, total, err := s.userRepo.FindAll(pagination)
	if err != nil {
		return nil, 0, err
	}
	// Sembunyikan password untuk semua user
	for i := range users {
		users[i].Password = ""
	}
	return users, total, nil
}

func (s *userServiceImpl) GetUserByID(userID uint) (*models.User, error) {
	user, err := s.userRepo.FindByID(userID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("pengguna tidak ditemukan")
		}
		return nil, err
	}
	user.Password = ""
	return user, nil
}

func (s *userServiceImpl) CreateUserByAdmin(user *models.User) (*models.User, error) {
	// Hash Password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}
	user.Password = string(hashedPassword)

	// Simpan ke Database
	if err := s.userRepo.Create(user); err != nil {
		return nil, err
	}
	user.Password = ""
	return user, nil
}

func (s *userServiceImpl) UpdateUserByAdmin(userID uint, fullName, email, username, role string) (*models.User, error) {
	user, err := s.userRepo.FindByID(userID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("pengguna tidak ditemukan")
		}
		return nil, err
	}

	// Update field jika ada isinya
	if fullName != "" {
		user.FullName = fullName
	}
	if email != "" {
		user.Email = email
	}
	if username != "" {
		user.Username = username
	}
	if role != "" && (role == models.RoleAdmin || role == models.RoleMember) {
		user.Role = role
	}

	if err := s.userRepo.Update(user); err != nil {
		return nil, err
	}
	user.Password = ""
	return user, nil
}

func (s *userServiceImpl) DeleteUserByAdmin(userID uint) error {
	// Tambahkan pengecekan, misal tidak bisa hapus diri sendiri
	// if userID == currentUser.ID { ... }
	
	_, err := s.userRepo.FindByID(userID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("pengguna tidak ditemukan")
		}
		return err
	}

	return s.userRepo.Delete(userID)
}
