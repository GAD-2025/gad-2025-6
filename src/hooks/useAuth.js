import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      try {
        // Replace with your actual authentication logic (e.g., API call)
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve({ name: 'John Doe', email: 'john.doe@example.com' });
          }, 1000)
        );
        setUser(response);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    // Replace with your actual login logic
    console.log('Logging in with:', email, password);
    setLoading(true);
    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({ name: 'John Doe', email: 'john.doe@example.com' });
        }, 1000)
      );
      setUser(response);
    } catch (error) {
      console.error('Failed to login:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    // Replace with your actual logout logic
    console.log('Logging out');
    setUser(null);
  };

  return { user, loading, login, logout };
};

export default useAuth;
