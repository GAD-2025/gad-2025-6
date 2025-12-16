-- Todak Database Schema
-- Complete database structure for the Todak application
-- Created: 2025-12-04

-- Drop existing tables (in reverse order of dependencies)
DROP TABLE IF EXISTS `bucket_list`;
DROP TABLE IF EXISTS `dday`;
DROP TABLE IF EXISTS `quizzes`;
DROP TABLE IF EXISTS `slow_letters`;
DROP TABLE IF EXISTS `matching`;
DROP TABLE IF EXISTS `users`;

-- ============================================
-- Table: users
-- Purpose: Store user account information
-- ============================================
CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `user_code` VARCHAR(8) NOT NULL,
  `country` VARCHAR(255) NOT NULL,
  `timezone` VARCHAR(255) NOT NULL,
  `matching_id` INT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `user_code` (`user_code`),
  KEY `idx_users_matching` (`matching_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- Table: matching
-- Purpose: Manage matching relationships between two users
-- ============================================
CREATE TABLE `matching` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user1_id` INT NOT NULL,
  `user2_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_users` (`user1_id`, `user2_id`),
  KEY `idx_matching_user1` (`user1_id`),
  KEY `idx_matching_user2` (`user2_id`),
  CONSTRAINT `matching_ibfk_1` FOREIGN KEY (`user1_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matching_ibfk_2` FOREIGN KEY (`user2_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Add foreign key constraint for users.matching_id (after matching table is created)
ALTER TABLE `users`
ADD CONSTRAINT `fk_users_matching`
  FOREIGN KEY (`matching_id`) REFERENCES `matching` (`id`) ON DELETE SET NULL;

-- ============================================
-- Table: slow_letters
-- Purpose: Store slow letters (messages) between matched users
-- ============================================
CREATE TABLE `slow_letters` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  `target_date` DATETIME NOT NULL,
  `matching_id` INT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `is_read` TINYINT(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `idx_slow_letters_matching` (`matching_id`),
  CONSTRAINT `slow_letters_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_slow_letters_matching` FOREIGN KEY (`matching_id`) REFERENCES `matching` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- Table: quizzes
-- Purpose: Store quizzes created by users
-- ============================================
CREATE TABLE `quizzes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `creator_id` INT NOT NULL,
  `answer` VARCHAR(255) NOT NULL,
  `hint` VARCHAR(255) NOT NULL,
  `image_url` TEXT NULL,
  `is_solve` TINYINT(1) DEFAULT '0',
  `submitted_at` TIMESTAMP NULL,
  `matching_id` INT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `creator_id` (`creator_id`),
  KEY `idx_quizzes_matching` (`matching_id`),
  CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_quizzes_matching` FOREIGN KEY (`matching_id`) REFERENCES `matching` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- Table: dday
-- Purpose: Store important dates and events
-- ============================================
CREATE TABLE `dday` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `content` TEXT,
  `matching_id` INT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `idx_dday_matching` (`matching_id`),
  CONSTRAINT `dday_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_dday_matching` FOREIGN KEY (`matching_id`) REFERENCES `matching` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- Table: bucket_list
-- Purpose: Store bucket list items
-- ============================================
CREATE TABLE `bucket_list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `is_completed` TINYINT(1) DEFAULT '0',
  `matching_id` INT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `idx_bucket_list_matching` (`matching_id`),
  CONSTRAINT `bucket_list_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_bucket_list_matching` FOREIGN KEY (`matching_id`) REFERENCES `matching` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Schema creation completed
