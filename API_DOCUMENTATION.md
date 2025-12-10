# API Documentation

## Base URL

```
http://localhost:3001
```

---

## Table of Contents

- [기본](#기본)
- [인증 (Authentication)](#인증-authentication)
- [매칭 (Matching)](#매칭-matching)
- [느린 편지 (Slow Letters)](#느린-편지-slow-letters)
- [퀴즈 (Quizzes)](#퀴즈-quizzes)
- [D-Day](#d-day)
- [버킷리스트 (Bucket List)](#버킷리스트-bucket-list)

---

## 기본

### 서버 상태 확인

```
GET /
```

**Response**

```
Hello World! This is the backend server.
```

### DB 연결 테스트

```
GET /api/test-db
```

**Response (200 OK)**

```json
{
  "success": true,
  "message": "Database connection successful!",
  "data": [{ "1": 1 }]
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Database connection failed."
}
```

---

## 인증 (Authentication)

### 회원가입

```
POST /api/auth/signup
```

**Request Body**

```typescript
{
  name: string,      // 필수
  email: string,     // 필수
  password: string   // 필수
}
```

**Example Request**

```json
{
  "name": "홍길동",
  "email": "hong@example.com",
  "password": "securePassword123"
}
```

**Response (201 Created)**

```typescript
{
  success: true,
  message: string,
  userId: number,
  user_code: string,      // 8자리 랜덤 영숫자 코드
  matching_id: null       // 신규 가입 시 항상 null
}
```

**Example Response**

```json
{
  "success": true,
  "message": "User created successfully.",
  "userId": 1,
  "user_code": "aB3dE7fG",
  "matching_id": null
}
```

**Response (400 Bad Request)**

```json
{
  "success": false,
  "message": "All fields are required."
}
```

**Response (409 Conflict)**

```json
{
  "success": false,
  "message": "User with this email already exists."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error during signup."
}
```

---

### 로그인

```
POST /api/auth/login
```

**Request Body**

```typescript
{
  email: string,     // 필수
  password: string   // 필수
}
```

**Example Request**

```json
{
  "email": "hong@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK)**

```typescript
{
  success: true,
  message: string,
  user: {
    id: number,
    name: string,
    email: string,
    user_code: string,
    matching_id: number | null  // 매칭된 경우 matching ID, 아니면 null
  }
}
```

**Example Response**

```json
{
  "success": true,
  "message": "Login successful.",
  "user": {
    "id": 1,
    "name": "홍길동",
    "email": "hong@example.com",
    "user_code": "aB3dE7fG",
    "matching_id": null
  }
}
```

**Response (400 Bad Request)**

```json
{
  "success": false,
  "message": "Email and password are required."
}
```

**Response (401 Unauthorized)**

```json
{
  "success": false,
  "message": "Invalid credentials."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error during login."
}
```

---

## 매칭 (Matching)

### 매칭 생성

```
POST /api/matching
```

**설명**: user_code를 사용하여 두 사용자를 매칭합니다. 매칭이 완료되면 두 사용자는 느린 편지, 퀴즈, D-Day, 버킷리스트를 공유할 수 있습니다.

**Request Body**

```typescript
{
  userId: number,       // 필수 (본인의 user ID)
  partnerCode: string   // 필수 (상대방의 user_code)
}
```

**Example Request**

```json
{
  "userId": 1,
  "partnerCode": "xY9zAb12"
}
```

**Response (201 Created)**

```typescript
{
  success: true,
  message: string,
  matchingId: number
}
```

**Example Response**

```json
{
  "success": true,
  "message": "Matching created successfully.",
  "matchingId": 5
}
```

**Response (400 Bad Request)**

```json
{
  "success": false,
  "message": "userId and partnerCode are required."
}
```

또는

```json
{
  "success": false,
  "message": "Cannot match with yourself."
}
```

**Response (404 Not Found)**

```json
{
  "success": false,
  "message": "Partner not found with the provided code."
}
```

또는

```json
{
  "success": false,
  "message": "User not found."
}
```

**Response (409 Conflict)**

```json
{
  "success": false,
  "message": "You are already matched with someone."
}
```

또는

```json
{
  "success": false,
  "message": "Partner is already matched with someone."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error while creating matching.",
  "error": "error message"
}
```

---

### 매칭 정보 조회

```
GET /api/matching/user/:userId
```

**설명**: 사용자의 매칭 정보와 파트너 정보를 조회합니다.

**URL Parameters**

```typescript
userId: number; // 필수
```

**Example Request**

```
GET /api/matching/user/1
```

**Response (200 OK) - 매칭된 경우**

```typescript
{
  success: true,
  matched: true,
  matching_id: number,
  created_at: string,  // ISO 8601 형식
  partner: {
    id: number,
    name: string,
    user_code: string
  }
}
```

**Example Response**

```json
{
  "success": true,
  "matched": true,
  "matching_id": 5,
  "created_at": "2025-12-03T10:00:00.000Z",
  "partner": {
    "id": 2,
    "name": "김철수",
    "user_code": "xY9zAb12"
  }
}
```

**Response (200 OK) - 매칭되지 않은 경우**

```json
{
  "success": true,
  "matched": false,
  "message": "User is not matched with anyone."
}
```

**Response (404 Not Found)**

```json
{
  "success": false,
  "message": "User not found."
}
```

또는

```json
{
  "success": false,
  "message": "Matching record not found."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error while fetching matching info."
}
```

---

### 매칭 해제

```
DELETE /api/matching/:matchingId
```

**설명**: 매칭을 해제합니다. ⚠️ 매칭 해제 시 해당 매칭과 관련된 모든 데이터(느린 편지, 퀴즈, D-Day, 버킷리스트)가 삭제됩니다.

**URL Parameters**

```typescript
matchingId: number; // 필수
```

**Example Request**

```
DELETE /api/matching/5
```

**Response (200 OK)**

```json
{
  "success": true,
  "message": "Matching deleted successfully."
}
```

**Response (404 Not Found)**

```json
{
  "success": false,
  "message": "Matching not found."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error while deleting matching."
}
```

---

## 느린 편지 (Slow Letters)

⚠️ **매칭 필수**: 느린 편지 기능은 매칭된 사용자만 사용할 수 있습니다. 매칭된 두 사용자가 모든 편지를 공유합니다.

### 편지 생성

```
POST /api/letters
```

**Request Body**

```typescript
{
  content: string,  // 필수
  userId: number    // 필수 (⚠️ 프로덕션에서는 인증 토큰에서 추출해야 함)
}
```

**Example Request**

```json
{
  "content": "미래의 나에게 보내는 편지입니다.",
  "userId": 1
}
```

**Response (201 Created)**

```typescript
{
  success: true,
  message: string,
  letterId: number
}
```

**Example Response**

```json
{
  "success": true,
  "message": "Letter saved successfully.",
  "letterId": 5
}
```

**Response (400 Bad Request)**

```json
{
  "success": false,
  "message": "Content and userId are required."
}
```

또는

```json
{
  "success": false,
  "message": "User is not matched with anyone. Letters can only be created within a matching."
}
```

**Response (404 Not Found)**

```json
{
  "success": false,
  "message": "User not found."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error while saving letter."
}
```

---

### 매칭된 사용자의 모든 편지 조회

```
GET /api/letters/user/:userId
```

**설명**: 매칭된 두 사용자가 작성한 모든 편지를 조회합니다. (본인과 파트너의 편지 모두 포함)

**URL Parameters**

```typescript
userId: number; // 필수
```

**Example Request**

```
GET /api/letters/user/1
```

**Response (200 OK)**

```typescript
{
  success: true,
  letters: Array<{
    id: number,
    user_id: number,
    content: string,
    matching_id: number,
    created_at: string  // ISO 8601 형식
  }>
}
```

**Example Response**

```json
{
  "success": true,
  "letters": [
    {
      "id": 5,
      "user_id": 1,
      "content": "미래의 나에게 보내는 편지입니다.",
      "matching_id": 3,
      "created_at": "2025-12-03T10:30:00.000Z"
    },
    {
      "id": 3,
      "user_id": 2,
      "content": "파트너가 작성한 편지",
      "matching_id": 3,
      "created_at": "2025-12-01T14:20:00.000Z"
    }
  ]
}
```

**Response (200 OK) - 매칭되지 않은 경우**

```json
{
  "success": true,
  "letters": [],
  "message": "User is not matched. No letters to display."
}
```

**Response (404 Not Found)**

```json
{
  "success": false,
  "message": "User not found."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error while fetching letters."
}
```

---

## 퀴즈 (Quizzes)

⚠️ **매칭 필수**: 퀴즈 기능은 매칭된 사용자만 사용할 수 있습니다. 매칭된 두 사용자가 모든 퀴즈를 공유합니다.

### 퀴즈 생성

```
POST /api/quizzes
```

**Request Body**

```typescript
{
  hint: string,       // 필수 - 정답을 찾기 위한 힌트
  answer: string,     // 필수 - 정답
  creatorId: number   // 필수 (⚠️ 프로덕션에서는 인증 토큰에서 추출해야 함)
}
```

**Example Request**

```json
{
  "hint": "우리가 처음 만난 장소",
  "answer": "카페 봄",
  "creatorId": 1
}
```

**Response (201 Created)**

```typescript
{
  success: true,
  message: string,
  quizId: number
}
```

**Example Response**

```json
{
  "success": true,
  "message": "Quiz created successfully.",
  "quizId": 7
}
```

**Response (400 Bad Request)**

```json
{
  "success": false,
  "message": "Hint, answer, and creatorId are required."
}
```

또는

```json
{
  "success": false,
  "message": "User is not matched with anyone. Quizzes can only be created within a matching."
}
```

**Response (404 Not Found)**

```json
{
  "success": false,
  "message": "User not found."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error while creating quiz."
}
```

---

### 매칭된 사용자의 모든 퀴즈 조회

```
GET /api/quizzes/user/:userId
```

**설명**: 매칭된 두 사용자가 작성한 모든 퀴즈를 조회합니다. (본인과 파트너의 퀴즈 모두 포함)

**URL Parameters**

```typescript
userId: number; // 필수
```

**Example Request**

```
GET /api/quizzes/user/1
```

**Response (200 OK)**

```typescript
{
  success: true,
  quizzes: Array<{
    id: number,
    creator_id: number,
    hint: string,           // 정답을 찾기 위한 힌트
    answer: string,         // 정답
    is_solve: boolean,      // 퀴즈 풀이 여부 (0: 미풀이, 1: 풀이완료)
    matching_id: number,
    created_at: string      // ISO 8601 형식
  }>
}
```

**Example Response**

```json
{
  "success": true,
  "quizzes": [
    {
      "id": 7,
      "creator_id": 1,
      "hint": "우리가 처음 만난 장소",
      "answer": "카페 봄",
      "is_solve": 0,
      "matching_id": 3,
      "created_at": "2025-12-03T10:35:00.000Z"
    },
    {
      "id": 5,
      "creator_id": 2,
      "hint": "파트너가 좋아하는 색깔",
      "answer": "파란색",
      "is_solve": 1,
      "matching_id": 3,
      "created_at": "2025-12-02T09:15:00.000Z"
    }
  ]
}
```

**Response (200 OK) - 매칭되지 않은 경우**

```json
{
  "success": true,
  "quizzes": [],
  "message": "User is not matched. No quizzes to display."
}
```

**Response (404 Not Found)**

```json
{
  "success": false,
  "message": "User not found."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error while fetching quizzes."
}
```

---

## D-Day

⚠️ **매칭 필수**: D-Day 기능은 매칭된 사용자만 사용할 수 있습니다. 매칭된 두 사용자가 모든 D-Day를 공유합니다.

### 매칭의 모든 D-Day 조회

```
GET /api/dday/matching/:matchingId
```

**설명**: 특정 매칭에 속한 모든 D-Day를 조회합니다. (본인과 파트너의 D-Day 모두 포함)

**URL Parameters**

```typescript
matchingId: number; // 필수
```

**Example Request**

```
GET /api/dday/matching/3
```

**Response (200 OK)**

```typescript
{
  success: true,
  dday: Array<{
    id: number,
    user_id: number,
    title: string,
    date: string,         // YYYY-MM-DD 형식
    content: string,
    matching_id: number,
    created_at: string    // ISO 8601 형식
  }>
}
```

**Example Response**

```json
{
  "success": true,
  "dday": [
    {
      "id": 3,
      "user_id": 1,
      "title": "졸업식",
      "date": "2025-02-15",
      "content": "드디어 졸업!",
      "matching_id": 3,
      "created_at": "2025-12-03T08:00:00.000Z"
    },
    {
      "id": 1,
      "user_id": 2,
      "title": "100일 기념일",
      "date": "2025-03-10",
      "content": "우리 100일 축하해",
      "matching_id": 3,
      "created_at": "2025-12-01T12:30:00.000Z"
    }
  ]
}
```

**Response (400 Bad Request)**

```json
{
  "success": false,
  "message": "Matching ID is required."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error.",
  "error": {}
}
```

---

### 특정 D-Day 조회 (단일 객체 반환)

```
GET /api/dday/:id
```

**URL Parameters**

```typescript
id: number; // 필수
```

**Example Request**

```
GET /api/dday/3
```

**Response (200 OK)**

```typescript
{
  success: true,
  dday: {
    id: number,
    user_id: number,
    title: string,
    date: string,      // YYYY-MM-DD 형식
    content: string,
    created_at: string // ISO 8601 형식
  }
}
```

**Example Response**

```json
{
  "success": true,
  "dday": {
    "id": 3,
    "user_id": 1,
    "title": "졸업식",
    "date": "2025-02-15",
    "content": "드디어 졸업!",
    "created_at": "2025-12-03T08:00:00.000Z"
  }
}
```

**Response (404 Not Found)**

```json
{
  "success": false,
  "message": "D-Day not found."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error.",
  "error": {}
}
```

---

### D-Day 생성

```
POST /api/dday
```

**Request Body**

```typescript
{
  userId: number,      // 필수
  matchingId: number,  // 필수
  title: string,       // 필수
  date: string,        // 필수, YYYY-MM-DD 형식
  content: string      // 선택
}
```

**Example Request**

```json
{
  "userId": 1,
  "matchingId": 3,
  "title": "생일",
  "date": "2025-05-20",
  "content": "내 생일!"
}
```

**Response (201 Created)**

```typescript
{
  success: true,
  message: string,
  ddayId: number
}
```

**Example Response**

```json
{
  "success": true,
  "message": "D-Day created.",
  "ddayId": 8
}
```

**Response (400 Bad Request)**

```json
{
  "success": false,
  "message": "userId, matchingId, title, and date are required."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error.",
  "error": {}
}
```

---

### D-Day 수정

```
PUT /api/dday/:id
```

**URL Parameters**

```typescript
id: number; // 필수
```

**Request Body**

```typescript
{
  title: string,    // 필수
  date: string,     // 필수, YYYY-MM-DD 형식
  content: string   // 필수
}
```

**Example Request**

```
PUT /api/dday/8
```

```json
{
  "title": "생일 파티",
  "date": "2025-05-20",
  "content": "친구들과 생일 파티!"
}
```

**Response (200 OK)**

```json
{
  "success": true,
  "message": "D-Day updated."
}
```

**Response (404 Not Found)**

```json
{
  "success": false,
  "message": "D-Day not found."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error.",
  "error": {}
}
```

---

### D-Day 삭제

```
DELETE /api/dday/:id
```

**URL Parameters**

```typescript
id: number; // 필수
```

**Example Request**

```
DELETE /api/dday/8
```

**Response (200 OK)**

```json
{
  "success": true,
  "message": "D-Day deleted."
}
```

**Response (404 Not Found)**

```json
{
  "success": false,
  "message": "D-Day not found."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error.",
  "error": {}
}
```

---

## 버킷리스트 (Bucket List)

⚠️ **매칭 필수**: 버킷리스트 기능은 매칭된 사용자만 사용할 수 있습니다. 매칭된 두 사용자가 모든 버킷리스트를 공유합니다.

### 매칭의 모든 버킷리스트 조회

```
GET /api/bucketlist/matching/:matchingId
```

**설명**: 특정 매칭에 속한 모든 버킷리스트를 조회합니다. (본인과 파트너의 버킷리스트 모두 포함)

**URL Parameters**

```typescript
matchingId: number; // 필수
```

**Example Request**

```
GET /api/bucketlist/matching/3
```

**Response (200 OK)**

```typescript
{
  success: true,
  bucketlist: Array<{
    id: number,
    user_id: number,
    title: string,
    content: string,
    is_completed: boolean,
    matching_id: number,
    created_at: string           // ISO 8601 형식
  }>
}
```

**Example Response**

```json
{
  "success": true,
  "bucketlist": [
    {
      "id": 5,
      "user_id": 1,
      "title": "제주도 여행",
      "content": "부모님과 함께 제주도 3박 4일 여행",
      "is_completed": false,
      "matching_id": 3,
      "created_at": "2025-12-03T09:00:00.000Z"
    },
    {
      "id": 3,
      "user_id": 2,
      "title": "마라톤",
      "content": "마라톤 완주하기",
      "is_completed": true,
      "matching_id": 3,
      "created_at": "2025-11-20T14:30:00.000Z"
    }
  ]
}
```

**Response (400 Bad Request)**

```json
{
  "success": false,
  "message": "Matching ID is required."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error.",
  "error": {}
}
```

---

### 특정 버킷리스트 조회 (단일 객체 반환)

```
GET /api/bucketlist/:id
```

**URL Parameters**

```typescript
id: number; // 필수
```

**Example Request**

```
GET /api/bucketlist/5
```

**Response (200 OK)**

```typescript
{
  success: true,
  bucketlist: {
    id: number,
    user_id: number,
    title: string,
    content: string,
    is_completed: boolean,
    created_at: string           // ISO 8601 형식
  }
}
```

**Example Response**

```json
{
  "success": true,
  "bucketlist": {
    "id": 5,
    "user_id": 1,
    "title": "제주도 여행",
    "content": "부모님과 제주도 여행",
    "is_completed": false,
    "created_at": "2025-12-03T09:00:00.000Z"
  }
}
```

**Response (404 Not Found)**

```json
{
  "success": false,
  "message": "Bucket List not found."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error.",
  "error": {}
}
```

---

### 버킷리스트 생성

```
POST /api/bucketlist
```

**Request Body**

```typescript
{
  userId: number,           // 필수
  matchingId: number,       // 필수
  title: string,            // 필수
  content: string           // 필수
}
```

**Example Request**

```json
{
  "userId": 1,
  "matchingId": 3,
  "title": "오로라 여행",
  "content": "오로라 보러 가기"
}
```

**Response (201 Created)**

```typescript
{
  success: true,
  message: string,
  bucketlistId: number
}
```

**Example Response**

```json
{
  "success": true,
  "message": "Bucket List created.",
  "bucketlistId": 12
}
```

**Response (400 Bad Request)**

```json
{
  "success": false,
  "message": "userId, matchingId, title, and content are required."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error.",
  "error": {}
}
```

---

### 버킷리스트 수정

```
PUT /api/bucketlist/:id
```

**URL Parameters**

```typescript
id: number; // 필수
```

**Request Body** (수정할 필드만 포함)

```typescript
{
  title?: string,            // 선택
  content?: string,          // 선택
  is_completed?: boolean,    // 선택
  target_date?: string | null  // 선택, YYYY-MM-DD 형식
}
```

**Example Request 1** (완료 상태만 변경)

```
PUT /api/bucketlist/5
```

```json
{
  "is_completed": true
}
```

**Example Request 2** (여러 필드 동시 수정)

```
PUT /api/bucketlist/5
```

```json
{
  "title": "제주도 장기 여행",
  "content": "부모님과 제주도 3박 4일 여행",
  "target_date": "2025-09-01"
}
```

**Response (200 OK)**

```json
{
  "success": true,
  "message": "Bucket List updated."
}
```

**Response (400 Bad Request)**

```json
{
  "success": false,
  "message": "No fields to update."
}
```

**Response (404 Not Found)**

```json
{
  "success": false,
  "message": "Bucket List not found."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error.",
  "error": {}
}
```

---

### 버킷리스트 삭제

```
DELETE /api/bucketlist/:id
```

**URL Parameters**

```typescript
id: number; // 필수
```

**Example Request**

```
DELETE /api/bucketlist/12
```

**Response (200 OK)**

```json
{
  "success": true,
  "message": "Bucket List deleted."
}
```

**Response (404 Not Found)**

```json
{
  "success": false,
  "message": "Bucket List not found."
}
```

**Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "Server error.",
  "error": {}
}
```

---

## 보안 고려사항

⚠️ **현재 구현은 개발/학습 목적입니다. 프로덕션 환경에서는 다음 사항들이 필요합니다:**

1. **인증 토큰 (JWT)**: 요청 본문에서 `userId`, `creatorId` 등을 받는 대신 JWT 토큰을 사용해야 합니다.
2. **권한 검증**: 사용자가 본인의 데이터만 조회/수정/삭제할 수 있도록 권한 체크가 필요합니다.
3. **입력 검증**: 데이터 타입, 길이, 형식 등에 대한 더 엄격한 검증이 필요합니다.
4. **Rate Limiting**: API 남용 방지를 위한 요청 제한이 필요합니다.
5. **HTTPS**: 프로덕션 환경에서는 HTTPS를 사용해야 합니다.
