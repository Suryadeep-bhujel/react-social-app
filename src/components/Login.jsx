import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData.email, formData.password);
      
      if (response.success) {
        // Login successful
        login(response.data.user, response.data.token);
        navigate('/dashboard');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="container">
        <div className="auth-card">
          <div className="p-5">
            <div className="text-center mb-4">
              <div style={{color: '#667eea', fontSize: '2rem', fontWeight: 'bold'}}>
                <i className="fas fa-share-alt me-2" />SocialApp
              </div>
              <p className="text-muted">Connect with friends and share your moments</p>
            </div>
            
            <ul className="nav nav-tabs auth-tabs justify-content-center mb-4">
              <li className="nav-item">
                <button className="nav-link active">Login</button>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Sign Up</Link>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane fade show active">
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <input 
                      type="email" 
                      className="form-control" 
                      name="email"
                      placeholder="Email Address" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <input 
                      type="password" 
                      className="form-control" 
                      name="password"
                      placeholder="Password" 
                      value={formData.password}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="remember"
                        name="remember"
                        checked={formData.remember}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-decoration-none">Forgot Password?</a>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </button>
                </form>
              </div>
            </div>
            
            <div className="text-center mt-3">
              <Link to="/dashboard" className="btn btn-outline-secondary">
                Continue as Guest
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;