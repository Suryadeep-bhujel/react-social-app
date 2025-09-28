import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    
    try {
      await register({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
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
              <p className="text-muted">Join the community and connect with friends</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-6">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="First Name" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="col-6">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Last Name" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Email Address" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Confirm Password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="terms" required />
                <label className="form-check-label" htmlFor="terms">
                  I agree to the <a href="#" className="text-decoration-none">Terms &amp; Conditions</a>
                </label>
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
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
              <p>Already have an account? <Link to="/login" className="text-decoration-none">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;