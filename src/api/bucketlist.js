const API_URL = process.env.REACT_APP_API_URL + '/api' || 'http://localhost:4000/api';

export const getBucketListsByMatchingId = async (matchingId) => {
    const response = await fetch(`${API_URL}/bucketlist/matching/${matchingId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch Bucket List items');
    }
    return response.json();
};

export const createBucketList = async (bucketListData) => {
    const response = await fetch(`${API_URL}/bucketlist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bucketListData),
    });
    if (!response.ok) {
        throw new Error('Failed to create Bucket List item');
    }
    return response.json();
};

export const updateBucketList = async (id, isCompleted) => {
    const response = await fetch(`${API_URL}/bucketlist/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isCompleted }),
    });
    if (!response.ok) {
        throw new Error('Failed to update Bucket List item');
    }
    return response.json();
};
