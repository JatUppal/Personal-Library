-- 1) Change the column from Postgres enum to TEXT
ALTER TABLE user_books
  ALTER COLUMN status TYPE text USING status::text;

-- 2) (Optional but recommended) Keep values aligned with your Java enum
--    If your Java enum is WISHLIST/READING/COMPLETED/ABANDONED, keep this list.
--    If your Java enum uses FINISHED instead of COMPLETED, change the list accordingly.
ALTER TABLE user_books
  ADD CONSTRAINT ck_user_books_status
  CHECK (status IN ('WISHLIST','READING','COMPLETED','ABANDONED'));