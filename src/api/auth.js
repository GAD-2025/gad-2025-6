// A mock function to simulate a login API call
export const login = async (email, password) => {
  console.log('Logging in with:', email, password);
  // Simulate a network request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would make an API call to your backend here
  // and handle success or error responses.
  if (email === 'test@example.com' && password === 'password') {
    return {
      success: true,
      user: {
        name: 'Test User',
        email: 'test@example.com',
      },
    };
  } else {
    return {
      success: false,
      message: 'Invalid email or password',
    };
  }
};

// A mock function to simulate a signup API call
export const signup = async (name, email, password) => {
  console.log('Signing up with:', name, email, password);
  // Simulate a network request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would make an API call to your backend here
  // to create a new user.
  return {
    success: true,
    user: {
      name,
      email,
    },
  };
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
