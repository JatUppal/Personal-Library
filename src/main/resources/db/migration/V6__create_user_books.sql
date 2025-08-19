DO $$ BEGIN
  CREATE TYPE reading_status AS ENUM ('WISHLIST','READING','COMPLETED','ABANDONED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE user_books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  status reading_status,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_user_book UNIQUE (user_id, book_id)
);

CREATE INDEX idx_user_books_user ON user_books(user_id);
CREATE INDEX idx_user_books_user_status ON user_books(user_id, status);
