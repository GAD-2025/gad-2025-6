const apiUrl = process.env.REACT_APP_API_URL;

// A mock function to simulate a login API call
export const login = async (email, password) => {
  const response = await fetch(`${apiUrl}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

// A mock function to simulate a signup API call
export const signup = async (name, email, password) => {
  const response = await fetch(`${apiUrl}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
};

// A mock function to simulate a logout API call
export const logout = async () => {
  console.log('Logging out');
  // Simulate a network request
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real application, you might invalidate a token on the server.
  return {
    success: true,
  };
};
