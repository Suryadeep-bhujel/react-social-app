import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call logout API if needed
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      logout();
      navigate('/login');
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <a className="navbar-brand brand-logo" href="#" onClick={(e) => e.preventDefault()}>
            <i className="fas fa-share-alt me-2" />SocialApp
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={(e) => e.preventDefault()}>
                  <i className="fas fa-home me-1" />Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={(e) => e.preventDefault()}>
                  <i className="fas fa-user me-1" />Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={(e) => e.preventDefault()}>
                  <i className="fas fa-search me-1" />Search
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={(e) => e.preventDefault()}>
                  <i className="fas fa-bell" />
                  <span className="badge bg-danger rounded-pill ms-1">3</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={(e) => e.preventDefault()}>
                  <i className="fas fa-envelope" />
                  <span className="badge bg-danger rounded-pill ms-1">2</span>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Profile" className="rounded-circle" width={30} height={30} />
                  <span className="ms-2">{user?.firstName || 'User'}</span>
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#" onClick={(e) => e.preventDefault()}>
                      <i className="fas fa-user me-2" />Profile
                    </a></li>
                  <li><a className="dropdown-item" href="#" onClick={(e) => e.preventDefault()}>
                      <i className="fas fa-cog me-2" />Settings
                    </a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2" />Logout
                    </a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Dashboard Page */}
      <div className="page-section active">
        <div className="main-content">
          <div className="container">
            <div className="row">
              {/* Main Content */}
              <div className="col-lg-8">
                {/* Stories */}
                <div className="story-container">
                  <h6 className="mb-3">Stories</h6>
                  <div className="row">
                    <div className="col">
                      <div className="story-item">
                        <div className="story-avatar add-story">
                          <i className="fas fa-plus fa-2x text-muted" />
                        </div>
                        <small>Add Story</small>
                      </div>
                    </div>
                    <div className="col">
                      <div className="story-item">
                        <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Story" className="story-avatar" />
                        <small>Sarah</small>
                      </div>
                    </div>
                    <div className="col">
                      <div className="story-item">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Story" className="story-avatar" />
                        <small>Mike</small>
                      </div>
                    </div>
                    <div className="col">
                      <div className="story-item">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Story" className="story-avatar" />
                        <small>Emily</small>
                      </div>
                    </div>
                    <div className="col">
                      <div className="story-item">
                        <img src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Story" className="story-avatar" />
                        <small>Alex</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Create Post */}
                <div className="create-post">
                  <div className="d-flex align-items-center mb-3">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Your Avatar" className="rounded-circle me-3" width={50} height={50} />
                    <input type="text" className="form-control rounded-pill" placeholder="What's on your mind?" />
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <button className="btn btn-outline-primary rounded-pill me-2">
                        <i className="fas fa-image me-1" />Photo
                      </button>
                      <button className="btn btn-outline-success rounded-pill me-2">
                        <i className="fas fa-video me-1" />Video
                      </button>
                      <button className="btn btn-outline-warning rounded-pill">
                        <i className="fas fa-smile me-1" />Feeling
                      </button>
                    </div>
                    <button className="btn btn-primary rounded-pill">Post</button>
                  </div>
                </div>

                {/* Posts */}
                <div className="card post-card">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Profile" className="rounded-circle me-3" width={50} height={50} />
                      <div>
                        <h6 className="mb-0">Sarah Johnson</h6>
                        <small className="text-muted">2 hours ago • <i className="fas fa-globe-americas" /></small>
                      </div>
                    </div>
                    <p>Just finished an amazing hike in the mountains! The view was absolutely breathtaking 🏔️ #NatureLover #Adventure</p>
                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Post" className="img-fluid rounded mb-3" />
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <button className="btn btn-link text-decoration-none me-3">
                          <i className="far fa-heart me-1" />45 Likes
                        </button>
                        <button className="btn btn-link text-decoration-none me-3">
                          <i className="far fa-comment me-1" />12 Comments
                        </button>
                        <button className="btn btn-link text-decoration-none">
                          <i className="far fa-share me-1" />Share
                        </button>
                      </div>
                      <button className="btn btn-link text-decoration-none">
                        <i className="far fa-bookmark" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card post-card">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Profile" className="rounded-circle me-3" width={50} height={50} />
                      <div>
                        <h6 className="mb-0">Mike Chen</h6>
                        <small className="text-muted">4 hours ago • <i className="fas fa-globe-americas" /></small>
                      </div>
                    </div>
                    <p>New coffee shop opened downtown and their latte art is incredible! ☕ Who wants to join me tomorrow?</p>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <button className="btn btn-link text-decoration-none me-3">
                          <i className="far fa-heart me-1" />28 Likes
                        </button>
                        <button className="btn btn-link text-decoration-none me-3">
                          <i className="far fa-comment me-1" />8 Comments
                        </button>
                        <button className="btn btn-link text-decoration-none">
                          <i className="far fa-share me-1" />Share
                        </button>
                      </div>
                      <button className="btn btn-link text-decoration-none">
                        <i className="far fa-bookmark" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-lg-4">
                <div className="card sidebar-card">
                  <div className="card-body">
                    <h6 className="card-title">Suggested for You</h6>
                    <div className="d-flex align-items-center mb-3">
                      <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-3" width={40} height={40} />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">Emily Davis</h6>
                        <small className="text-muted">3 mutual friends</small>
                      </div>
                      <button className="btn btn-outline-primary btn-sm">Follow</button>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <img src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-3" width={40} height={40} />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">Alex Rodriguez</h6>
                        <small className="text-muted">5 mutual friends</small>
                      </div>
                      <button className="btn btn-outline-primary btn-sm">Follow</button>
                    </div>
                  </div>
                </div>

                <div className="trending-topics">
                  <h6 className="mb-3"><i className="fas fa-fire me-2" />Trending Topics</h6>
                  <div className="mb-2">
                    <a href="#" className="text-white text-decoration-none">#Photography</a>
                    <small className="d-block text-light opacity-75">12.5k posts</small>
                  </div>
                  <div className="mb-2">
                    <a href="#" className="text-white text-decoration-none">#Travel</a>
                    <small className="d-block text-light opacity-75">8.3k posts</small>
                  </div>
                  <div className="mb-2">
                    <a href="#" className="text-white text-decoration-none">#Food</a>
                    <small className="d-block text-light opacity-75">6.1k posts</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;