BEGIN;

ALTER TABLE user_books
  DROP CONSTRAINT IF EXISTS ck_user_books_status;

-- Match your Java enum: PLANNED, READING, COMPLETED, ABANDONED
ALTER TABLE user_books
  ADD CONSTRAINT ck_user_books_status
  CHECK (status IN ('PLANNED','READING','COMPLETED','ABANDONED'));

COMMIT;
