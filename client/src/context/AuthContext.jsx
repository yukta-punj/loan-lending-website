import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState(null);

  // Function to check if the user is authenticated by calling the /me endpoint
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    try {
      const response = await fetch('http://localhost:5005/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        console.log(data.user)
        setIsAuthenticated(true);
        setMessage('User is authenticated');
      } else {
        // Token might be invalid or expired, so clear storage and update state
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        setMessage(data.message || 'Authentication check failed');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setMessage(error.message);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Check auth status when the provider mounts
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', { email });
      const response = await fetch('http://localhost:5005/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', { 
        status: response.status, 
        ok: response.ok, 
        data: { ...data, token: data.token ? '[HIDDEN]' : undefined } 
      });

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (!data.token) {
        throw new Error('No token received from server');
      }

      if (!data.user) {
        throw new Error('No user data received from server');
      }

      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage('Login successful!');
      return data.user.role;
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.message || 'Login failed');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setMessage('Logged out successfully!');
  };

  const register = async (email, password, name, role) => {
    try {
      console.log('Attempting registration with:', { email, name, role });
      const response = await fetch('http://localhost:5005/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, role }),
      });

      const data = await response.json();
      console.log('Registration response:', { 
        status: response.status, 
        ok: response.ok, 
        data: { ...data, token: data.token ? '[HIDDEN]' : undefined } 
      });

      if (!response.ok) {
        if (data.message) {
          setMessage(data.message);
          throw new Error(data.message);
        }
        setMessage(`Registration failed with status ${response.status}`);
        throw new Error(`Registration failed with status ${response.status}`);
      }

      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage('Registration successful! Welcome to our platform.');
      return data.user;
    } catch (error) {
      console.error('Registration error:', error);
      setMessage(error.message);
      throw error;
    }
  };

  const clearMessage = () => {
    setMessage(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      register,
      message,
      clearMessage,
      checkAuth // exposed in case you want to manually trigger an auth check later
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
