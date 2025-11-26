package mysql

import (
	"fmt"
	"log"

	"backend/internal/config"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func InitDB(cfg *config.Config) *gorm.DB {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		cfg.DBUser,
		cfg.DBPassword,
		cfg.DBHost,
		cfg.DBPort,
		cfg.DBName,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Gagal menghubungkan ke database Mysql %v", err)
	}

	log.Println("Berhasil terhubung dengan database MySql")
	return db
}

func AutoMigrate(db *gorm.DB, models ...interface{}) {
	// Disable foreign key checks temporarily to avoid migration failures
	// when existing tables have incompatible FK column definitions.
	// NOTE: This is a convenience for development. For production,
	// ensure your schema and foreign key types are consistent.
	if err := db.Exec("SET FOREIGN_KEY_CHECKS=0;").Error; err != nil {
		log.Printf("gagal menonaktifkan foreign key checks: %v", err)
	}
	defer func() {
		if err := db.Exec("SET FOREIGN_KEY_CHECKS=1;").Error; err != nil {
			log.Printf("gagal mengaktifkan kembali foreign key checks: %v", err)
		}
	}()

	err := db.AutoMigrate(models...)
	if err != nil {
		log.Fatalf("gagal auto migrate tabel %v", err)
	}
	log.Println("Migrasi tabel (AutoMigrate) sukses.")
}
