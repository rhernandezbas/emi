require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'host.docker.internal',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME || 'caja_cartas',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
