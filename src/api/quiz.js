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
 * 새로운 퀴즈를 서버에 생성합니다.
 * @param {object} quizData - { question: "질문", answer: "답" } 형태의 객체
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
      question: quizData.question,
      answer: quizData.answer,
      creatorId: creatorId, // 중요: 보안에 취약하므로 추후 인증 토큰 방식으로 변경해야 합니다.
    }),
  });
  return response.json();
};
