require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

app.use(express.json());

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

// 회원가입 API 엔드포인트
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const connection = await pool.getConnection();

    // 이메일 중복 확인
    const [existingUsers] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      connection.release();
      return res.status(409).json({ success: false, message: 'User with this email already exists.' });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 정보 저장
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    connection.release();
    res.status(201).json({ success: true, message: 'User created successfully.', userId: result.insertId });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Server error during signup.' });
  }
});

// 로그인 API 엔드포인트
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    const connection = await pool.getConnection();

    // 이메일로 사용자 찾기
    const [users] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    connection.release();

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const user = users[0];

    // 비밀번호 확인
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // 로그인 성공
    // In a real app, you would generate a JWT or session token here
    res.status(200).json({ 
      success: true, 
      message: 'Login successful.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
  console.log('Access the DB test endpoint at http://localhost:3001/api/test-db');
});
