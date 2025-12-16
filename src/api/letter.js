const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * 사용자의 모든 편지를 가져옵니다.
 * @param {number} userId - 편지를 조회할 사용자의 ID
 * @returns {Promise<Array>} 사용자의 편지 목록
 */
export const getLetters = async (userId) => {
  if (!userId) {
    console.error('getLetters: userId is required');
    return [];
  }
  const response = await fetch(`${apiUrl}/api/letters/user/${userId}`);
  const data = await response.json();
  if (data.success) {
    return data.letters;
  } else {
    console.error('Failed to fetch letters:', data.message);
    return [];
  }
};

/**
 * 새로운 편지를 서버에 전송합니다.
 * @param {object} letterData - { title: "편지 제목", content: "편지 내용" } 형태의 객체
 * @param {number} userId - 편지를 보내는 사용자의 ID
 * @returns {Promise<object>} API 응답 객체
 */
export const sendLetter = async (letterData, userId) => {
  if (!userId) {
    return { success: false, message: 'User is not logged in.' };
  }
  const response = await fetch(`${apiUrl}/api/letters`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: letterData.content,
      targetDate: letterData.targetDate,
      userId: userId, // 중요: 보안에 취약하므로 추후 인증 토큰 방식으로 변경해야 합니다.
    }),
  });
  return response.json();
};

/**
 * 편지를 읽음 처리합니다.
 * @param {number} letterId - 읽음 처리할 편지의 ID
 * @returns {Promise<object>} API 응답 객체
 */
export const markLetterAsRead = async (letterId) => {
  if (!letterId) {
    return { success: false, message: 'Letter ID is required.' };
  }
  const response = await fetch(`${apiUrl}/api/letters/${letterId}/read`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      isRead: true,
    }),
  });
  return response.json();
};
