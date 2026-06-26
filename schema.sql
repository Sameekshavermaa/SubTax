CREATE DATABASE IF NOT EXISTS subtax_db;
USE subtax_db;

CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) NOT NULL UNIQUE,
  phone      VARCHAR(15),
  password   VARCHAR(255) NOT NULL,
  role       VARCHAR(50) DEFAULT 'user',
  language   VARCHAR(50) DEFAULT 'English',
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  price      DECIMAL(10,2) NOT NULL,
  currency   ENUM('INR','USD','EUR','GBP') DEFAULT 'INR',
  billing    ENUM('weekly','monthly','yearly') DEFAULT 'monthly',
  category   ENUM('entertainment','productivity','cloud','shopping','fitness','custom') DEFAULT 'entertainment',
  user_id    INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
