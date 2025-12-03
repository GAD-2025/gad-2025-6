const API_URL = process.env.REACT_APP_API_URL + '/api' || 'http://localhost:4000/api';

export const getDdaysByMatchingId = async (matchingId) => {
  const response = await fetch(`${API_URL}/dday/matching/${matchingId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch D-Day events');
  }
  return response.json();
};

export const getDdayById = async (id) => {
  const response = await fetch(`${API_URL}/dday/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch D-Day event');
  }
  return response.json();
};

export const createDday = async (ddayData) => {
  const response = await fetch(`${API_URL}/dday`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ddayData),
  });
  if (!response.ok) {
    throw new Error('Failed to create D-Day event');
  }
  return response.json();
};

export const updateDday = async (id, ddayData) => {
  const response = await fetch(`${API_URL}/dday/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ddayData),
  });
  if (!response.ok) {
    throw new Error('Failed to update D-Day event');
  }
  return response.json();
};
