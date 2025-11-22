require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3001;

// MySQL Connection Pool 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Hello World! This is the backend server.');
});

// DB 연결 테스트를 위한 API 엔드포인트
app.get('/api/test-db', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT 1');
    connection.release();
    res.json({ success: true, message: 'Database connection successful!', data: rows });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, message: 'Database connection failed.' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
  console.log('Access the DB test endpoint at http://localhost:3001/api/test-db');
});
