-- ============================================================
--  GLOMA INTERNATIONAL — MySQL database setup
--  Import this whole file via cPanel → phpMyAdmin → Import.
--  Safe to run more than once (uses IF NOT EXISTS).
-- ============================================================

-- ---------- 1. SITE SETTINGS (one row: social links + stats) ----------
CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY,
  facebook_url VARCHAR(255) NOT NULL DEFAULT '',
  instagram_url VARCHAR(255) NOT NULL DEFAULT '',
  youtube_url VARCHAR(255) NOT NULL DEFAULT '',
  tiktok_url VARCHAR(255) NOT NULL DEFAULT '',
  whatsapp_url VARCHAR(255) NOT NULL DEFAULT '',
  stat_years INT NOT NULL DEFAULT 5,
  stat_projects INT NOT NULL DEFAULT 200,
  stat_team INT NOT NULL DEFAULT 25,
  stat_satisfaction INT NOT NULL DEFAULT 98,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO site_settings (id) VALUES (1);

-- ---------- 2. WORKS (portfolio projects) ----------
CREATE TABLE IF NOT EXISTS works (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL DEFAULT '',
  description TEXT,
  image_url VARCHAR(500) NOT NULL DEFAULT '',
  video_url VARCHAR(500) NOT NULL DEFAULT '',
  media_type VARCHAR(20) NOT NULL DEFAULT 'graphic', -- 'reel' | 'ad' | 'graphic'
  images JSON,                                       -- list of image URLs (for carousels)
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------- 3. VIDEOS ----------
CREATE TABLE IF NOT EXISTS videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  video_url VARCHAR(500) NOT NULL DEFAULT '',
  thumbnail_url VARCHAR(500) NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------- 4. TESTIMONIALS ----------
CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT '',
  quote TEXT NOT NULL,
  avatar_url VARCHAR(500) NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------- 5. CAMPAIGNS (case studies) ----------
CREATE TABLE IF NOT EXISTS campaigns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  result VARCHAR(255) NOT NULL DEFAULT '',
  description TEXT,
  metrics JSON,                -- e.g. [{"num":"2M+","label":"Reach"}]
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------- 6. TRUSTED CLIENTS (logos) ----------
CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo_url VARCHAR(500) NOT NULL DEFAULT '',
  website VARCHAR(500) NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------- 7. PLATFORMS WE WORK ON ----------
CREATE TABLE IF NOT EXISTS platforms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo_url VARCHAR(500) NOT NULL DEFAULT '',
  description TEXT,
  url VARCHAR(500) NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------- 8. ADMIN USERS (replaces Supabase Auth) ----------
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
--  DONE! Next: create your one admin_users row — see DEPLOY.md
-- ============================================================
