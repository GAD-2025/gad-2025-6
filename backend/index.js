require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3002'],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

// MySQL Connection Pool 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true, // 여러 SQL 문 실행 허용
});

// 데이터베이스 초기화 함수
async function initializeDatabase() {
  let connection;
  try {
    console.log('Checking database schema...');
    connection = await pool.getConnection();

    // users 테이블 존재 확인
    const [tables] = await connection.query(
      "SHOW TABLES LIKE 'users'"
    );

    if (tables.length === 0) {
      console.log('Tables not found. Creating database schema...');

      // schema.sql 파일 읽기
      const schemaPath = path.join(__dirname, 'schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');

      // SQL 문을 개별적으로 실행
      const statements = schema
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--') && !stmt.startsWith('/*'));

      for (const statement of statements) {
        if (statement.includes('DROP TABLE') ||
            statement.includes('CREATE TABLE') ||
            statement.includes('ALTER TABLE') ||
            statement.includes('CREATE INDEX')) {
          await connection.query(statement);
        }
      }

      console.log('✓ Database schema created successfully!');
    } else {
      console.log('✓ Database schema already exists.');
    }

    connection.release();
  } catch (error) {
    if (connection) connection.release();
    console.error('Error initializing database:', error);
    throw error;
  }
}

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
    const [existingUsers] = await connection.execute('SELECT * FROM users WHERE email = ?', [
      email,
    ]);
    if (existingUsers.length > 0) {
      await connection.rollback();
      connection.release();
      return res
        .status(409)
        .json({ success: false, message: 'User with this email already exists.' });
    }

    // 고유한 사용자 코드 생성
    let userCode;
    let isCodeUnique = false;
    while (!isCodeUnique) {
      userCode = generateRandomCode(8);
      const [existingCodes] = await connection.execute('SELECT * FROM users WHERE user_code = ?', [
        userCode,
      ]);
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
      user_code: userCode, // Include user_code in the response
      matching_id: null, // New users have no matching initially
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
        user_code: user.user_code, // Include user_code in the response
        matching_id: user.matching_id, // Include matching_id in the response
      },
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

    // 사용자의 matching_id 가져오기
    const [users] = await connection.execute('SELECT matching_id FROM users WHERE id = ?', [
      userId,
    ]);

    if (users.length === 0) {
      connection.release();
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const matchingId = users[0].matching_id;

    if (!matchingId) {
      connection.release();
      return res
        .status(400)
        .json({
          success: false,
          message:
            'User is not matched with anyone. Letters can only be created within a matching.',
        });
    }

    const [result] = await connection.execute(
      'INSERT INTO slow_letters (user_id, content, matching_id) VALUES (?, ?, ?)',
      [userId, content, matchingId]
    );
    connection.release();
    res
      .status(201)
      .json({ success: true, message: 'Letter saved successfully.', letterId: result.insertId });
  } catch (error) {
    console.error('Error saving letter:', error);
    res.status(500).json({ success: false, message: 'Server error while saving letter.' });
  }
});

// 특정 사용자의 모든 느린 편지 조회 API 엔드포인트 (매칭된 사용자와 공유)
app.get('/api/letters/user/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required.' });
  }

  try {
    const connection = await pool.getConnection();

    // 사용자의 matching_id 가져오기
    const [users] = await connection.execute('SELECT matching_id FROM users WHERE id = ?', [
      userId,
    ]);

    if (users.length === 0) {
      connection.release();
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const matchingId = users[0].matching_id;

    if (!matchingId) {
      connection.release();
      return res
        .status(200)
        .json({
          success: true,
          letters: [],
          message: 'User is not matched. No letters to display.',
        });
    }

    // 매칭된 사용자들의 모든 편지 조회 (matching_id 기준)
    const [letters] = await connection.execute(
      'SELECT * FROM slow_letters WHERE matching_id = ? ORDER BY created_at DESC',
      [matchingId]
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
    return res
      .status(400)
      .json({ success: false, message: 'Question, answer, and creatorId are required.' });
  }

  try {
    const connection = await pool.getConnection();

    // 사용자의 matching_id 가져오기
    const [users] = await connection.execute('SELECT matching_id FROM users WHERE id = ?', [
      creatorId,
    ]);

    if (users.length === 0) {
      connection.release();
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const matchingId = users[0].matching_id;

    if (!matchingId) {
      connection.release();
      return res
        .status(400)
        .json({
          success: false,
          message:
            'User is not matched with anyone. Quizzes can only be created within a matching.',
        });
    }

    const [result] = await connection.execute(
      'INSERT INTO quizzes (creator_id, question, answer, matching_id) VALUES (?, ?, ?, ?)',
      [creatorId, question, answer, matchingId]
    );
    connection.release();
    res
      .status(201)
      .json({ success: true, message: 'Quiz created successfully.', quizId: result.insertId });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ success: false, message: 'Server error while creating quiz.' });
  }
});

// 특정 사용자의 퀴즈 조회 API 엔드포인트 (매칭된 사용자와 공유)
app.get('/api/quizzes/user/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required.' });
  }

  try {
    const connection = await pool.getConnection();

    // 사용자의 matching_id 가져오기
    const [users] = await connection.execute('SELECT matching_id FROM users WHERE id = ?', [
      userId,
    ]);

    if (users.length === 0) {
      connection.release();
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const matchingId = users[0].matching_id;

    if (!matchingId) {
      connection.release();
      return res
        .status(200)
        .json({
          success: true,
          quizzes: [],
          message: 'User is not matched. No quizzes to display.',
        });
    }

    // 매칭된 사용자들의 모든 퀴즈 조회 (matching_id 기준)
    const [quizzes] = await connection.execute(
      'SELECT * FROM quizzes WHERE matching_id = ? ORDER BY created_at DESC',
      [matchingId]
    );
    connection.release();
    res.status(200).json({ success: true, quizzes });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching quizzes.' });
  }
});

// D-Day API Endpoints

// 특정 매칭의 모든 D-Day 조회
app.get('/api/dday/matching/:matchingId', async (req, res) => {
  const { matchingId } = req.params;

  if (!matchingId) {
    return res.status(400).json({ success: false, message: 'Matching ID is required.' });
  }

  try {
    const connection = await pool.getConnection();

    // 매칭된 사용자들의 모든 D-Day 조회 (matching_id 기준)
    const [ddays] = await connection.execute('SELECT * FROM dday WHERE matching_id = ?', [
      matchingId,
    ]);
    connection.release();
    res.json({ success: true, dday: ddays });
  } catch (error) {
    console.error('Error fetching D-Days:', error);
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
  const { userId, matchingId, title, date, content } = req.body;

  if (!userId || !matchingId || !title || !date) {
    return res
      .status(400)
      .json({ success: false, message: 'userId, matchingId, title, and date are required.' });
  }

  try {
    const connection = await pool.getConnection();

    const [result] = await connection.execute(
      'INSERT INTO dday (user_id, title, date, content, matching_id) VALUES (?, ?, ?, ?, ?)',
      [userId, title, date, content, matchingId]
    );
    connection.release();
    res.status(201).json({ success: true, message: 'D-Day created.', ddayId: result.insertId });
  } catch (error) {
    console.error('Error creating D-Day:', error);
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

// 특정 매칭의 모든 Bucket List 조회
app.get('/api/bucketlist/matching/:matchingId', async (req, res) => {
  const { matchingId } = req.params;

  if (!matchingId) {
    return res.status(400).json({ success: false, message: 'Matching ID is required.' });
  }

  try {
    const connection = await pool.getConnection();

    // 매칭된 사용자들의 모든 Bucket List 조회 (matching_id 기준)
    const [bucketlist] = await connection.execute(
      'SELECT * FROM bucket_list WHERE matching_id = ?',
      [matchingId]
    );
    connection.release();
    res.json({ success: true, bucketlist });
  } catch (error) {
    console.error('Error fetching bucket list:', error);
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
  const { userId, matchingId, title, content } = req.body;

  if (!userId || !matchingId || !title || !content) {
    return res
      .status(400)
      .json({ success: false, message: 'userId, matchingId, title, and content are required.' });
  }

  try {
    const connection = await pool.getConnection();

    const [result] = await connection.execute(
      'INSERT INTO bucket_list (user_id, title, content, matching_id) VALUES (?, ?, ?, ?)',
      [userId, title, content, matchingId]
    );
    connection.release();
    res
      .status(201)
      .json({ success: true, message: 'Bucket List created.', bucketlistId: result.insertId });
  } catch (error) {
    console.error('Error creating Bucket List:', error);
    res.status(500).json({ success: false, message: 'Server error.', error });
  }
});

// Bucket List 수정
app.put('/api/bucketlist/:id', async (req, res) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body;

  const allowedFields = ['title', 'content', 'is_completed'];
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

// Matching API Endpoints

// 매칭 생성 (user_code 기반)
app.post('/api/matching', async (req, res) => {
  const { userId, partnerCode } = req.body;

  if (!userId || !partnerCode) {
    return res
      .status(400)
      .json({ success: false, message: 'userId and partnerCode are required.' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. 상대방 찾기
    const [partners] = await connection.execute(
      'SELECT id, matching_id FROM users WHERE user_code = ?',
      [partnerCode]
    );

    if (partners.length === 0) {
      await connection.rollback();
      connection.release();
      return res
        .status(404)
        .json({ success: false, message: 'Partner not found with the provided code.' });
    }

    const partner = partners[0];

    // 2. 본인 정보 확인
    const [me] = await connection.execute('SELECT id, matching_id FROM users WHERE id = ?', [
      userId,
    ]);

    if (me.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const currentUser = me[0];

    // 3. 유효성 검사
    if (currentUser.id === partner.id) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({ success: false, message: 'Cannot match with yourself.' });
    }

    if (currentUser.matching_id !== null) {
      await connection.rollback();
      connection.release();
      return res
        .status(409)
        .json({ success: false, message: 'You are already matched with someone.' });
    }

    if (partner.matching_id !== null) {
      await connection.rollback();
      connection.release();
      return res
        .status(409)
        .json({ success: false, message: 'Partner is already matched with someone.' });
    }

    // 4. matching 레코드 생성
    const [matchResult] = await connection.execute(
      'INSERT INTO matching (user1_id, user2_id) VALUES (?, ?)',
      [currentUser.id, partner.id]
    );

    const matchingId = matchResult.insertId;

    // 5. 두 사용자의 matching_id 업데이트
    await connection.execute('UPDATE users SET matching_id = ? WHERE id IN (?, ?)', [
      matchingId,
      currentUser.id,
      partner.id,
    ]);

    await connection.commit();
    connection.release();

    res.status(201).json({
      success: true,
      message: 'Matching created successfully.',
      matchingId: matchingId,
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    console.error('Error creating matching:', error);
    res
      .status(500)
      .json({
        success: false,
        message: 'Server error while creating matching.',
        error: error.message,
      });
  }
});

// 매칭 정보 조회
app.get('/api/matching/user/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required.' });
  }

  try {
    const connection = await pool.getConnection();

    // 사용자의 매칭 정보 가져오기
    const [users] = await connection.execute('SELECT matching_id FROM users WHERE id = ?', [
      userId,
    ]);

    if (users.length === 0) {
      connection.release();
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const user = users[0];

    if (user.matching_id === null) {
      connection.release();
      return res.status(200).json({
        success: true,
        matched: false,
        message: 'User is not matched with anyone.',
      });
    }

    // 매칭 정보와 파트너 정보 가져오기
    const [matchings] = await connection.execute(
      `SELECT m.id as matching_id, m.user1_id, m.user2_id, m.created_at,
                    u1.name as user1_name, u1.user_code as user1_code,
                    u2.name as user2_name, u2.user_code as user2_code
             FROM matching m
             JOIN users u1 ON m.user1_id = u1.id
             JOIN users u2 ON m.user2_id = u2.id
             WHERE m.id = ?`,
      [user.matching_id]
    );

    if (matchings.length === 0) {
      connection.release();
      return res.status(404).json({ success: false, message: 'Matching record not found.' });
    }

    const matching = matchings[0];
    connection.release();

    // 파트너 정보 결정 (자신이 user1이면 user2가 파트너, 반대도 마찬가지)
    const isUser1 = matching.user1_id === parseInt(userId);
    const partner = isUser1
      ? { id: matching.user2_id, name: matching.user2_name, user_code: matching.user2_code }
      : { id: matching.user1_id, name: matching.user1_name, user_code: matching.user1_code };

    res.status(200).json({
      success: true,
      matched: true,
      matching_id: matching.matching_id,
      created_at: matching.created_at,
      partner: partner,
    });
  } catch (error) {
    console.error('Error fetching matching info:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching matching info.' });
  }
});

// 매칭 해제
app.delete('/api/matching/:matchingId', async (req, res) => {
  const { matchingId } = req.params;

  if (!matchingId) {
    return res.status(400).json({ success: false, message: 'Matching ID is required.' });
  }

  try {
    const connection = await pool.getConnection();

    // matching 삭제 (users의 matching_id는 ON DELETE SET NULL로 자동 처리)
    const [result] = await connection.execute('DELETE FROM matching WHERE id = ?', [matchingId]);

    connection.release();

    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Matching deleted successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'Matching not found.' });
    }
  } catch (error) {
    console.error('Error deleting matching:', error);
    res.status(500).json({ success: false, message: 'Server error while deleting matching.' });
  }
});

// 서버 시작
async function startServer() {
  try {
    // 데이터베이스 초기화
    await initializeDatabase();

    // 서버 시작
    app.listen(port, () => {
      console.log(`Backend server listening at http://localhost:${port}`);
      console.log('Access the DB test endpoint at http://localhost:3001/api/test-db');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// 서버 시작 실행
startServer();