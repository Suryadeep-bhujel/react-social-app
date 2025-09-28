import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
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
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="remember" />
                  <label className="form-check-label" htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="text-decoration-none">Forgot Password?</a>
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="text-center">
              <p className="mb-3">Or continue with</p>
              <div className="row">
                <div className="col-6">
                  <a href="#" className="social-login d-block">
                    <i className="fab fa-google me-2" />Google
                  </a>
                </div>
                <div className="col-6">
                  <a href="#" className="social-login d-block">
                    <i className="fab fa-facebook-f me-2" />Facebook
                  </a>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-3">
              <p>Don't have an account? <Link to="/register" className="text-decoration-none">Sign up</Link></p>
            </div>
            
            <div className="text-center mt-3">
              <button className="btn btn-outline-secondary" onClick={() => navigate('/dashboard')}>
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;