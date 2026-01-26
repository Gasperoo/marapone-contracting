import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load login state from localStorage on mount
    const savedLoginState = localStorage.getItem('isLoggedIn') === 'true';
    const savedUser = localStorage.getItem('user');
    
    setIsLoggedIn(savedLoginState);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  const login = (email, password) => {
    // Simple login logic - you can enhance this with actual authentication
    const userData = {
      email,
      // Add other user data as needed
    };
    
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  };

  const signup = (email, password, name) => {
    // Simple signup logic - you can enhance this with actual registration
    const userData = {
      email,
      name,
    };
    
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    
    return true;
  };

  const value = {
    isLoggedIn,
    user,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
