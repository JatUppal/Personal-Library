CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  google_volume_id VARCHAR(64) UNIQUE,
  isbn13 VARCHAR(13) UNIQUE,
  title VARCHAR(400) NOT NULL,
  authors TEXT,
  published_year INT,
  page_count INT,
  cover_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
