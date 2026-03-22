CREATE DATABASE IF NOT EXISTS caja_cartas
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE caja_cartas;

CREATE TABLE IF NOT EXISTS cartas (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  nombre_remitente VARCHAR(100) NOT NULL,
  mensaje          TEXT NOT NULL,
  color_sobre      VARCHAR(30) NOT NULL,
  foto_url         VARCHAR(255) DEFAULT NULL,
  fecha_creacion   DATETIME DEFAULT CURRENT_TIMESTAMP
);
