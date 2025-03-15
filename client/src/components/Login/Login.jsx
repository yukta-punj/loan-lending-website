import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { API_ENDPOINTS } from '../../config/api';
import { IoClose } from 'react-icons/io5';
import { FaEnvelope, FaPhone, FaLock, FaSpinner } from 'react-icons/fa';
import './Login.css';

const Login = ({ onClose, onRegisterClick }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!formData.email.trim() && !formData.phone.trim()) {
      setError('Please enter either email or phone number');
      return false;
    }
    if (formData.email && !formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.phone && !/^\+?[1-9]\d{9,14}$/.test(formData.phone.replace(/\s+/g, ''))) {
      setError('Please enter a valid phone number (e.g., +1234567890 or 1234567890)');
      return false;
    }
    if (!formData.password) {
      setError('Please enter your password');
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const cleaned = value.replace(/[^\d+]/g, '');
      const formatted = cleaned.startsWith('+') ? cleaned : cleaned.replace(/^\+/, '');
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const loginData = {
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        password: formData.password
      };

      console.log('Sending login request with:', loginData);

      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Login failed');
      }

      if (!data.user || !data.token) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('token', data.token);
      
      login(data.user);
      onClose();
    } catch (err) {
      console.error('Login error:', err);
      if (err.message.includes('Invalid credentials')) {
        setError('Invalid email/phone or password. Please try again.');
      } else if (err.message.includes('Password is required')) {
        setError('Please enter your password.');
      } else if (err.message.includes('Please provide either email or phone number')) {
        setError('Please enter either your email or phone number.');
      } else {
        setError(err.message || 'An error occurred during login. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <button className="close-button" onClick={onClose}>
          <IoClose size={24} />
        </button>

        <div className="login-content">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your Leisure Loan account</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <div className="input-icon">
                <FaEnvelope />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <FaPhone />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number (e.g., +1234567890)"
                pattern="^\+?[1-9]\d{9,14}$"
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <FaLock />
              </div>
              <div className="password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`login-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="spinner" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="register-link-container">
            <p>Don't have an account?</p>
            <button 
              className="register-link" 
              onClick={() => {
                onClose();
                onRegisterClick();
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 