-- V9__rename_WISHLIST_to_PLANNED.sql

-- 0) Drop any existing constraint so we can freely update data
ALTER TABLE user_books DROP CONSTRAINT IF EXISTS ck_user_books_status;

-- 1) Rename data
UPDATE user_books SET status = 'PLANNED' WHERE status = 'WISHLIST';

-- 2) Clean up NULLs or any unexpected legacy values
UPDATE user_books
SET status = 'PLANNED'
WHERE status IS NULL
   OR status NOT IN ('PLANNED','READING','COMPLETED');

-- 3) Recreate the final strict check
ALTER TABLE user_books
  ADD CONSTRAINT ck_user_books_status
  CHECK (status IN ('PLANNED','READING','COMPLETED'));

-- 4) Set the default going forward
ALTER TABLE user_books ALTER COLUMN status SET DEFAULT 'PLANNED';
