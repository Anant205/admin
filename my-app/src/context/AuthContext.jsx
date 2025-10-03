

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false); 

  useEffect(() => {
    localStorage.removeItem('authToken'); 
    
    const timer = setTimeout(() => {
        setIsAuthenticated(false);
        setUser(null);
        setShowLoginModal(true);
        setIsLoading(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  const login = async (credentials) => {
    if (credentials.username === 'admin' && credentials.password === 'password') {
      localStorage.setItem('authToken', 'dummy_admin_token'); 
      setIsAuthenticated(true);
      setUser({ username: credentials.username });
      setShowLoginModal(false); 
      return true;
    } else {
      console.error('Login failed: Invalid credentials');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
    setShowLoginModal(true); 
  };

  const authContextValue = useMemo(() => ({ user, isAuthenticated, isLoading, login, logout, showLoginModal, setShowLoginModal }), [user, isAuthenticated, isLoading, showLoginModal]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);