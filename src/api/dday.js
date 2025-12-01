const API_URL = '/api';

export const getDdaysByUserId = async (userId) => {
    const response = await fetch(`${API_URL}/dday/user/${userId}`);
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
