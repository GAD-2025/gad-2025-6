-- Migration: Remove dday_id and add title field to bucket_list table
-- Created: 2025-12-03

-- Remove dday_id column
ALTER TABLE bucket_list DROP COLUMN dday_id;

-- Add title column (VARCHAR 255, NOT NULL)
ALTER TABLE bucket_list ADD COLUMN title VARCHAR(255) NOT NULL AFTER user_id;
