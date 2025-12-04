import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserById } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // 1. localStorage에서 user를 찾음
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
          // 2-1. user 정보가 있다면 userId를 사용하여 /api/users/:userId를 통해 user 정보를 새롭게 가져옴
          const parsedUser = JSON.parse(storedUser);

          if (parsedUser.id) {
            try {
              const result = await getUserById(parsedUser.id);

              if (result.success && result.user) {
                // 새로운 user 정보를 다시 localStorage에 저장
                localStorage.setItem('user', JSON.stringify(result.user));
                setUser(result.user);
              } else {
                // API 호출이 실패하면 localStorage의 기존 데이터 사용
                setUser(parsedUser);
              }
            } catch (error) {
              console.error('Failed to fetch user data:', error);
              // 에러 발생 시에도 기존 localStorage 데이터 사용
              setUser(parsedUser);
            }
          } else {
            // userId가 없는 경우 기존 데이터 사용
            setUser(parsedUser);
          }
        }
        // 2-2. user 정보가 없다면 로그인 상태가 아님 (user는 null 상태 유지)
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        // localStorage 데이터가 손상된 경우 제거
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
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
