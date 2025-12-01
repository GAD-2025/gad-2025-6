require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002'],
  credentials: true
}));
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

// Helper function to generate a random alphanumeric code
const generateRandomCode = (length) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// 회원가입 API 엔드포인트
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 이메일 중복 확인
    const [existingUsers] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      await connection.rollback();
      connection.release();
      return res.status(409).json({ success: false, message: 'User with this email already exists.' });
    }

    // 고유한 사용자 코드 생성
    let userCode;
    let isCodeUnique = false;
    while (!isCodeUnique) {
      userCode = generateRandomCode(8);
      const [existingCodes] = await connection.execute('SELECT * FROM users WHERE user_code = ?', [userCode]);
      if (existingCodes.length === 0) {
        isCodeUnique = true;
      }
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 정보 저장
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, password, user_code) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, userCode]
    );
    
    await connection.commit();
    connection.release();

    res.status(201).json({ 
      success: true, 
      message: 'User created successfully.', 
      userId: result.insertId,
      user_code: userCode // Include user_code in the response
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
      connection.release();
    }
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
        email: user.email,
        user_code: user.user_code // Include user_code in the response
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

// 느린 편지 생성 API 엔드포인트
app.post('/api/letters', async (req, res) => {
  const { content, userId } = req.body;

  // 중요: 실제 프로덕션 환경에서는 요청 본문(body)에서 userId를 직접 받는 것은 매우 위험합니다.
  // 이 userId는 인증 토큰(JWT 등)을 통해 서버에서 직접 추출해야 안전합니다.
  // 현재 구조상 임시로 이 방법을 사용합니다.
  if (!content || !userId) {
    return res.status(400).json({ success: false, message: 'Content and userId are required.' });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO slow_letters (user_id, content) VALUES (?, ?)',
      [userId, content]
    );
    connection.release();
    res.status(201).json({ success: true, message: 'Letter saved successfully.', letterId: result.insertId });
  } catch (error) {
    console.error('Error saving letter:', error);
    res.status(500).json({ success: false, message: 'Server error while saving letter.' });
  }
});

// 특정 사용자의 모든 느린 편지 조회 API 엔드포인트
app.get('/api/letters/user/:userId', async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is required.' });
    }

    try {
        const connection = await pool.getConnection();
        const [letters] = await connection.execute(
            'SELECT * FROM slow_letters WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        connection.release();
        res.status(200).json({ success: true, letters });
    } catch (error) {
        console.error('Error fetching letters:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching letters.' });
    }
});

// 퀴즈 생성 API 엔드포인트
app.post('/api/quizzes', async (req, res) => {
  const { question, answer, creatorId } = req.body;

  // 중요: creatorId는 보안을 위해 실제로는 인증 토큰에서 추출해야 합니다.
  if (!question || !answer || !creatorId) {
    return res.status(400).json({ success: false, message: 'Question, answer, and creatorId are required.' });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO quizzes (creator_id, question, answer) VALUES (?, ?, ?)',
      [creatorId, question, answer]
    );
    connection.release();
    res.status(201).json({ success: true, message: 'Quiz created successfully.', quizId: result.insertId });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ success: false, message: 'Server error while creating quiz.' });
  }
});

// 특정 사용자가 만든 퀴즈 조회 API 엔드포인트
app.get('/api/quizzes/user/:userId', async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is required.' });
    }

    try {
        const connection = await pool.getConnection();
        const [quizzes] = await connection.execute(
            'SELECT * FROM quizzes WHERE creator_id = ? ORDER BY created_at DESC',
            [userId]
        );
        connection.release();
        res.status(200).json({ success: true, quizzes });
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching quizzes.' });
    }
});

// D-Day API Endpoints

// 특정 사용자의 모든 D-Day 조회
app.get('/api/dday/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const connection = await pool.getConnection();
        const [ddays] = await connection.execute('SELECT * FROM dday WHERE user_id = ?', [userId]);
        connection.release();
        res.json({ success: true, dday: ddays });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.', error });
    }
});

// 특정 D-Day 조회
app.get('/api/dday/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await pool.getConnection();
        const [dday] = await connection.execute('SELECT * FROM dday WHERE id = ?', [id]);
        connection.release();
        if (dday.length > 0) {
            res.json({ success: true, dday: dday[0] });
        } else {
            res.status(404).json({ success: false, message: 'D-Day not found.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.', error });
    }
});

// D-Day 생성
app.post('/api/dday', async (req, res) => {
    const { userId, title, date, content } = req.body;
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.execute(
            'INSERT INTO dday (user_id, title, date, content) VALUES (?, ?, ?, ?)',
            [userId, title, date, content]
        );
        connection.release();
        res.status(201).json({ success: true, message: 'D-Day created.', ddayId: result.insertId });
    } catch (error) {
        console.error('Error creating D-Day:', error); // Add this line for detailed logging
        res.status(500).json({ success: false, message: 'Server error.', error });
    }
});

// D-Day 수정
app.put('/api/dday/:id', async (req, res) => {
    const { id } = req.params;
    const { title, date, content } = req.body;
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.execute(
            'UPDATE dday SET title = ?, date = ?, content = ? WHERE id = ?',
            [title, date, content, id]
        );
        connection.release();
        if (result.affectedRows > 0) {
            res.json({ success: true, message: 'D-Day updated.' });
        } else {
            res.status(404).json({ success: false, message: 'D-Day not found.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.', error });
    }
});

// D-Day 삭제
app.delete('/api/dday/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.execute('DELETE FROM dday WHERE id = ?', [id]);
        connection.release();
        if (result.affectedRows > 0) {
            res.json({ success: true, message: 'D-Day deleted.' });
        } else {
            res.status(404).json({ success: false, message: 'D-Day not found.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.', error });
    }
});

// Bucket List API Endpoints

// 특정 사용자의 모든 Bucket List 조회
app.get('/api/bucketlist/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const connection = await pool.getConnection();
        const [bucketlist] = await connection.execute('SELECT * FROM bucket_list WHERE user_id = ?', [userId]);
        connection.release();
        res.json({ success: true, bucketlist });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.', error });
    }
});

// 특정 Bucket List 조회
app.get('/api/bucketlist/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await pool.getConnection();
        const [bucketlist] = await connection.execute('SELECT * FROM bucket_list WHERE id = ?', [id]);
        connection.release();
        if (bucketlist.length > 0) {
            res.json({ success: true, bucketlist: bucketlist[0] });
        } else {
            res.status(404).json({ success: false, message: 'Bucket List not found.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.', error });
    }
});

// Bucket List 생성
app.post('/api/bucketlist', async (req, res) => {
    const { userId, content, target_date } = req.body;
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.execute(
            'INSERT INTO bucket_list (user_id, content, target_date) VALUES (?, ?, ?)',
            [userId, content, target_date]
        );
        connection.release();
        res.status(201).json({ success: true, message: 'Bucket List created.', bucketlistId: result.insertId });
    } catch (error) {
        console.error('Error creating Bucket List:', error);
        res.status(500).json({ success: false, message: 'Server error.', error });
    }
});

// Bucket List 수정
app.put('/api/bucketlist/:id', async (req, res) => {
    const { id } = req.params;
    const fieldsToUpdate = req.body;

    const allowedFields = ['content', 'is_completed', 'target_date'];
    const updates = [];
    const values = [];

    for (const field of allowedFields) {
        if (fieldsToUpdate.hasOwnProperty(field)) {
            updates.push(`${field} = ?`);
            values.push(fieldsToUpdate[field]);
        }
    }

    if (updates.length === 0) {
        return res.status(400).json({ success: false, message: 'No fields to update.' });
    }

    values.push(id);
    const sql = `UPDATE bucket_list SET ${updates.join(', ')} WHERE id = ?`;

    try {
        const connection = await pool.getConnection();
        const [result] = await connection.execute(sql, values);
        connection.release();

        if (result.affectedRows > 0) {
            res.json({ success: true, message: 'Bucket List updated.' });
        } else {
            res.status(404).json({ success: false, message: 'Bucket List not found.' });
        }
    } catch (error) {
        console.error('Error updating Bucket List:', error);
        res.status(500).json({ success: false, message: 'Server error.', error });
    }
});

// Bucket List 삭제
app.delete('/api/bucketlist/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.execute('DELETE FROM bucket_list WHERE id = ?', [id]);
        connection.release();
        if (result.affectedRows > 0) {
            res.json({ success: true, message: 'Bucket List deleted.' });
        } else {
            res.status(404).json({ success: false, message: 'Bucket List not found.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.', error });
    }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
  console.log('Access the DB test endpoint at http://localhost:3001/api/test-db');
});
