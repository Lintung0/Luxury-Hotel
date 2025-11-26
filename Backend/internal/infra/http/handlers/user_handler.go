package handlers

import (
	"backend/pkg/utils"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type UserHandler struct {
	db *gorm.DB
}

func NewUserHandler(db *gorm.DB) *UserHandler {
	return &UserHandler{db: db}
}

// GetAllUsers - Admin only
func (h *UserHandler) GetAllUsers(c *fiber.Ctx) error {
	var users []struct {
		ID       uint   `json:"ID"`
		Username string `json:"Username"`
		FullName string `json:"FullName"`
		Email    string `json:"Email"`
		Role     string `json:"Role"`
	}

	if err := h.db.Table("users").Select("id, username, full_name, email, role").Find(&users).Error; err != nil {
		return utils.RespondError(c, fiber.StatusInternalServerError, "Failed to fetch users")
	}

	return utils.RespondSuccess(c, fiber.StatusOK, "Success", fiber.Map{"users": users})
}

// DeleteUser - Admin only
func (h *UserHandler) DeleteUser(c *fiber.Ctx) error {
	userID, err := strconv.ParseUint(c.Params("id"), 10, 32)
	if err != nil {
		return utils.RespondError(c, fiber.StatusBadRequest, "Invalid user ID")
	}

	if err := h.db.Table("users").Where("id = ? AND role != ?", userID, "admin").Delete(nil).Error; err != nil {
		return utils.RespondError(c, fiber.StatusInternalServerError, "Failed to delete user")
	}

	return utils.RespondSuccess(c, fiber.StatusOK, "User deleted successfully", nil)
}

// UpdateUserRole - Admin only
func (h *UserHandler) UpdateUserRole(c *fiber.Ctx) error {
	userID, err := strconv.ParseUint(c.Params("id"), 10, 32)
	if err != nil {
		return utils.RespondError(c, fiber.StatusBadRequest, "Invalid user ID")
	}

	var input struct {
		Role string `json:"role"`
	}
	if err := c.BodyParser(&input); err != nil {
		return utils.RespondError(c, fiber.StatusBadRequest, "Invalid request")
	}

	if input.Role != "admin" && input.Role != "member" {
		return utils.RespondError(c, fiber.StatusBadRequest, "Invalid role")
	}

	if err := h.db.Table("users").Where("id = ?", userID).Update("role", input.Role).Error; err != nil {
		return utils.RespondError(c, fiber.StatusInternalServerError, "Failed to update role")
	}

	return utils.RespondSuccess(c, fiber.StatusOK, "Role updated successfully", nil)
}

type UpdateProfileInput struct {
	Username string `json:"username"`
	FullName string `json:"full_name"`
	Email    string `json:"email"`
}

// UpdateProfile - Member only
func (h *UserHandler) UpdateProfile(c *fiber.Ctx) error {
	userID := c.Locals("userID").(uint)

	var input UpdateProfileInput
	if err := c.BodyParser(&input); err != nil {
		return utils.RespondError(c, fiber.StatusBadRequest, "Invalid input")
	}

	if err := h.db.Table("users").Where("id = ?", userID).Updates(map[string]interface{}{
		"username":  input.Username,
		"full_name": input.FullName,
		"email":     input.Email,
	}).Error; err != nil {
		return utils.RespondError(c, fiber.StatusInternalServerError, "Failed to update profile")
	}

	return utils.RespondSuccess(c, fiber.StatusOK, "Profile updated successfully", nil)
}
