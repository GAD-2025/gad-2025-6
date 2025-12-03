-- Migration script for matching system
-- Created: 2025-12-03
-- Purpose: Add matching table and modify users table to support user matching

-- Step 1: Create matching table
CREATE TABLE IF NOT EXISTS matching (
  id INT NOT NULL AUTO_INCREMENT,
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE,
  -- Prevent duplicate matching between same two users
  UNIQUE KEY unique_users (user1_id, user2_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Step 2: Add matching_id column to users table
ALTER TABLE users
ADD COLUMN matching_id INT NULL,
ADD CONSTRAINT fk_users_matching
  FOREIGN KEY (matching_id) REFERENCES matching(id) ON DELETE SET NULL;

-- Step 3: Create index for better query performance
CREATE INDEX idx_matching_user1 ON matching(user1_id);
CREATE INDEX idx_matching_user2 ON matching(user2_id);
CREATE INDEX idx_users_matching ON users(matching_id);

-- Step 4: Add matching_id to dday table
ALTER TABLE dday
ADD COLUMN matching_id INT NULL,
ADD CONSTRAINT fk_dday_matching
  FOREIGN KEY (matching_id) REFERENCES matching(id) ON DELETE CASCADE;

CREATE INDEX idx_dday_matching ON dday(matching_id);

-- Step 5: Add matching_id to bucket_list table
ALTER TABLE bucket_list
ADD COLUMN matching_id INT NULL,
ADD CONSTRAINT fk_bucket_list_matching
  FOREIGN KEY (matching_id) REFERENCES matching(id) ON DELETE CASCADE;

CREATE INDEX idx_bucket_list_matching ON bucket_list(matching_id);

-- Step 6: Add matching_id to slow_letters table
ALTER TABLE slow_letters
ADD COLUMN matching_id INT NULL,
ADD CONSTRAINT fk_slow_letters_matching
  FOREIGN KEY (matching_id) REFERENCES matching(id) ON DELETE CASCADE;

CREATE INDEX idx_slow_letters_matching ON slow_letters(matching_id);

-- Step 7: Add matching_id to quizzes table
ALTER TABLE quizzes
ADD COLUMN matching_id INT NULL,
ADD CONSTRAINT fk_quizzes_matching
  FOREIGN KEY (matching_id) REFERENCES matching(id) ON DELETE CASCADE;

CREATE INDEX idx_quizzes_matching ON quizzes(matching_id);
