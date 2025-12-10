const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * 특정 사용자가 만든 모든 퀴즈를 가져옵니다.
 * @param {number} userId - 퀴즈를 조회할 사용자의 ID
 * @returns {Promise<Array>} 사용자의 퀴즈 목록
 */
export const getQuizzes = async (userId) => {
  if (!userId) {
    console.error("getQuizzes: userId is required");
    return [];
  }
  const response = await fetch(`${apiUrl}/api/quizzes/user/${userId}`);
  const data = await response.json();
  if (data.success) {
    return data.quizzes;
  } else {
    console.error("Failed to fetch quizzes:", data.message);
    return [];
  }
};

/**
 * 특정 퀴즈 ID로 단일 퀴즈를 가져옵니다.
 * @param {number} quizId - 조회할 퀴즈의 ID
 * @returns {Promise<object|null>} 퀴즈 객체 또는 null
 */
export const getQuizById = async (quizId) => {
  if (!quizId) {
    console.error("getQuizById: quizId is required");
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}/api/quizzes/${quizId}`);
    const data = await response.json();

    if (data.success) {
      return data.quiz;
    } else {
      console.error("Failed to fetch quiz:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return null;
  }
};

/**
 * 새로운 퀴즈를 서버에 생성합니다.
 * @param {object} quizData - { hint: "힌트", answer: "답" } 형태의 객체
 * @param {number} creatorId - 퀴즈를 생성하는 사용자의 ID
 * @returns {Promise<object>} API 응답 객체
 */
export const createQuiz = async (quizData, creatorId) => {
  if (!creatorId) {
    return { success: false, message: "User is not logged in." };
  }
  const response = await fetch(`${apiUrl}/api/quizzes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hint: quizData.hint,
      answer: quizData.answer,
      creatorId: creatorId, // 중요: 보안에 취약하므로 추후 인증 토큰 방식으로 변경해야 합니다.
    }),
  });
  return response.json();
};

/**
 * 퀴즈 답안을 제출합니다.
 * @param {number} quizId - 제출할 퀴즈의 ID
 * @param {string} answer - 사용자가 제출하는 답안
 * @returns {Promise<object>} API 응답 객체 { success, correct, message }
 */
export const submitQuizAnswer = async (quizId, answer) => {
  if (!quizId || !answer) {
    return { success: false, message: "Quiz ID and answer are required." };
  }

  try {
    const response = await fetch(`${apiUrl}/api/quizzes/${quizId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer }),
    });
    return response.json();
  } catch (error) {
    console.error("Error submitting quiz answer:", error);
    return { success: false, message: "Failed to submit answer." };
  }
};

/**
 * 퀴즈를 삭제합니다.
 * @param {number} quizId - 삭제할 퀴즈의 ID
 * @returns {Promise<object>} API 응답 객체
 */
export const deleteQuiz = async (quizId) => {
  const response = await fetch(`${apiUrl}/api/quizzes/${quizId}`, {
    method: 'DELETE',
  });
  return response.json();
};
