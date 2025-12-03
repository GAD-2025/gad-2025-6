-- Migration: Remove target_date field from bucket_list table
-- Created: 2025-12-03

-- Remove target_date column
ALTER TABLE bucket_list DROP COLUMN target_date;
