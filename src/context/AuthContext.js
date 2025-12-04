import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          // matchingId가 null인 경우에만 자동 로그인 요청
          if (!parsedUser.matching_id && parsedUser.email && parsedUser.password) {
            try {
              const result = await apiLogin(parsedUser.email, parsedUser.password);
              if (result.success && result.user) {
                const updatedUser = result.user;
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
              }
            } catch (error) {
              console.error("Auto-login failed:", error);
            }
          }
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        // Handle error, maybe clear localStorage
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false); // Set loading to false after check
      }
    };

    initializeAuth();
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
