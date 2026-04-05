CREATE TYPE user_role AS ENUM ('ADMIN', 'STUDENT', 'CLIENT');
CREATE TYPE user_status AS ENUM ('PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED');

CREATE TABLE institutions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(200) NOT NULL,
  domain      VARCHAR(100) NOT NULL UNIQUE,   -- e.g. "rtu.ac.in"
  type        VARCHAR(50) NOT NULL,            -- COLLEGE | STARTUP
  approved    BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email               VARCHAR(255) NOT NULL UNIQUE,
  password_hash       VARCHAR(255) NOT NULL,
  full_name           VARCHAR(200) NOT NULL,
  role                user_role NOT NULL,
  status              user_status NOT NULL DEFAULT 'PENDING_VERIFICATION',
  institution_id      UUID REFERENCES institutions(id),
  email_verified      BOOLEAN NOT NULL DEFAULT false,
  verification_token  VARCHAR(255),
  refresh_token_hash  VARCHAR(255),
  last_login_at       TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_email   ON users(email);
CREATE INDEX idx_users_role    ON users(role);
CREATE INDEX idx_users_status  ON users(status);

-- Seed admin (password: Admin@123 — bcrypt hash)
INSERT INTO users (email, password_hash, full_name, role, status, email_verified)
VALUES (
  'admin@karo.local',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RkT5KICAW',
  'Karo Admin',
  'ADMIN',
  'ACTIVE',
  true
);
