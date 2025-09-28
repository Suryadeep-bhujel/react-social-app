import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  // State management for posts, comments, and likes (from PR functionality)
  const [posts, setPosts] = useState([
    {
      id: 1,
      userId: 1,
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      content: "Just finished an amazing hike in the mountains! The view was absolutely breathtaking 🏔️ #NatureLover #Adventure",
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      timestamp: '2 hours ago',
      likes: 42,
      liked: false,
      comments: [
        {
          id: 1,
          userId: 2,
          userName: 'Mike Chen',
          userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
          content: "Wow! Where is this exactly? Looks incredible! 😍",
          timestamp: '1h',
          likes: 0,
          liked: false,
          replies: []
        }
      ]
    },
    {
      id: 2,
      userId: 2,
      userName: 'Mike Chen',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      content: "New coffee shop opened downtown and their latte art is incredible! ☕ Who wants to join me tomorrow?",
      image: null,
      timestamp: '4 hours ago',
      likes: 28,
      liked: false,
      comments: []
    }
  ]);

  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [replyInputs, setReplyInputs] = useState({});

  // Handle creating a new post
  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost = {
      id: posts.length + 1,
      userId: 1,
      userName: user?.name || 'Sarah Johnson',
      userAvatar: user?.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      content: newPostContent,
      image: newPostImage,
      timestamp: 'Just now',
      likes: 0,
      liked: false,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewPostImage(null);
  };

  // Handle liking/unliking a post
  const handleLikePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  // Handle adding a comment
  const handleAddComment = (postId) => {
    const commentText = commentInputs[postId];
    if (!commentText?.trim()) return;

    const newComment = {
      id: Date.now(),
      userId: 1,
      userName: user?.name || 'Sarah Johnson',
      userAvatar: user?.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      content: commentText,
      timestamp: 'Just now',
      likes: 0,
      liked: false,
      replies: []
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  // Handle liking/unliking a comment
  const handleLikeComment = (postId, commentId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                liked: !comment.liked,
                likes: comment.liked ? comment.likes - 1 : comment.likes + 1
              };
            }
            return comment;
          })
        };
      }
      return post;
    }));
  };

  // Handle adding a reply to a comment
  const handleAddReply = (postId, commentId) => {
    const replyText = replyInputs[`${postId}-${commentId}`];
    if (!replyText?.trim()) return;

    const newReply = {
      id: Date.now(),
      userId: 1,
      userName: user?.name || 'Sarah Johnson',
      userAvatar: user?.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      content: replyText,
      timestamp: 'Just now',
      likes: 0,
      liked: false
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...comment.replies, newReply]
              };
            }
            return comment;
          })
        };
      }
      return post;
    }));

    setReplyInputs({ ...replyInputs, [`${postId}-${commentId}`]: '' });
  };

  // Handle liking/unliking a reply
  const handleLikeReply = (postId, commentId, replyId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: comment.replies.map(reply => {
                  if (reply.id === replyId) {
                    return {
                      ...reply,
                      liked: !reply.liked,
                      likes: reply.liked ? reply.likes - 1 : reply.likes + 1
                    };
                  }
                  return reply;
                })
              };
            }
            return comment;
          })
        };
      }
      return post;
    }));
  };

  // Handle image upload (simplified for demo)
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPostImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <a className="navbar-brand brand-logo" href="#">
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
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                  <img src={user?.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"} alt="Profile" className="rounded-circle" width={30} height={30} />
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
                    <img src={user?.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"} alt="Profile" className="rounded-circle me-3" width={50} height={50} />
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder={`What's on your mind, ${user?.name?.split(' ')[0] || 'Sarah'}?`}
                      style={{borderRadius: '25px'}} 
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCreatePost()}
                    />
                  </div>
                  {newPostImage && (
                    <div className="mb-3">
                      <img src={newPostImage} alt="Upload preview" className="img-fluid rounded" style={{maxHeight: '200px'}} />
                      <button 
                        className="btn btn-sm btn-outline-danger ms-2" 
                        onClick={() => setNewPostImage(null)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <div className="d-flex justify-content-between">
                    <div>
                      <label className="btn btn-outline-primary btn-sm me-2" style={{cursor: 'pointer'}}>
                        <i className="fas fa-image me-1" />Photo
                        <input 
                          type="file" 
                          accept="image/*" 
                          style={{display: 'none'}} 
                          onChange={handleImageUpload}
                        />
                      </label>
                      <button className="btn btn-outline-success btn-sm me-2">
                        <i className="fas fa-video me-1" />Video
                      </button>
                      <button className="btn btn-outline-warning btn-sm">
                        <i className="fas fa-smile me-1" />Feeling
                      </button>
                    </div>
                    <button 
                      className="btn btn-primary btn-sm" 
                      onClick={handleCreatePost}
                      disabled={!newPostContent.trim()}
                    >
                      Post
                    </button>
                  </div>
                </div>

                {/* Posts Feed */}
                {posts.map(post => (
                  <div key={post.id} className="card post-card">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <img src={post.userAvatar} alt="Profile" className="rounded-circle me-3" width={50} height={50} />
                        <div>
                          <h6 className="mb-0">{post.userName}</h6>
                          <small className="text-muted">{post.timestamp} • <i className="fas fa-globe-americas" /></small>
                        </div>
                        <div className="ms-auto">
                          <button className="btn btn-sm btn-outline-secondary">
                            <i className="fas fa-ellipsis-h" />
                          </button>
                        </div>
                      </div>
                      <p>{post.content}</p>
                      {post.image && (
                        <img src={post.image} className="img-fluid rounded mb-3" alt="Post content" />
                      )}
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex">
                          <button 
                            className="btn btn-link text-decoration-none me-3"
                            onClick={() => handleLikePost(post.id)}
                            style={{color: post.liked ? '#e74c3c' : 'inherit'}}
                          >
                            <i className={post.liked ? "fas fa-heart me-1" : "far fa-heart me-1"} />
                            {post.likes} Likes
                          </button>
                          <button className="btn btn-link text-decoration-none me-3">
                            <i className="far fa-comment me-1" />{post.comments.length} Comments
                          </button>
                          <button className="btn btn-link text-decoration-none">
                            <i className="fas fa-share me-1" />Share
                          </button>
                        </div>
                        <button className="btn btn-link text-decoration-none">
                          <i className="far fa-bookmark" />
                        </button>
                      </div>
                      
                      {/* Comments Section */}
                      <hr />
                      <div className="comments-section">
                        {post.comments.map(comment => (
                          <div key={comment.id} className="mb-3">
                            <div className="d-flex mb-2">
                              <img src={comment.userAvatar} alt="User" className="rounded-circle me-2" width={35} height={35} />
                              <div className="bg-light rounded p-2 flex-grow-1">
                                <div className="d-flex justify-content-between align-items-start">
                                  <div>
                                    <strong>{comment.userName}</strong> <small className="text-muted">{comment.timestamp}</small><br />
                                    <span>{comment.content}</span>
                                  </div>
                                  <button 
                                    className="btn btn-sm btn-link p-0"
                                    onClick={() => handleLikeComment(post.id, comment.id)}
                                    style={{color: comment.liked ? '#e74c3c' : 'inherit'}}
                                  >
                                    <i className={comment.liked ? "fas fa-heart" : "far fa-heart"} />
                                    {comment.likes > 0 && <span className="ms-1">{comment.likes}</span>}
                                  </button>
                                </div>
                                <div className="mt-2">
                                  <button 
                                    className="btn btn-sm btn-link text-muted p-0"
                                    onClick={() => {
                                      const replyKey = `${post.id}-${comment.id}`;
                                      const currentInputs = document.querySelectorAll(`[data-reply-id="${replyKey}"]`);
                                      currentInputs.forEach(input => input.style.display = input.style.display === 'none' ? 'flex' : 'none');
                                    }}
                                  >
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            {/* Replies */}
                            {comment.replies.map(reply => (
                              <div key={reply.id} className="d-flex mb-2 ms-4">
                                <img src={reply.userAvatar} alt="User" className="rounded-circle me-2" width={30} height={30} />
                                <div className="bg-light rounded p-2 flex-grow-1">
                                  <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                      <strong>{reply.userName}</strong> <small className="text-muted">{reply.timestamp}</small><br />
                                      <span>{reply.content}</span>
                                    </div>
                                    <button 
                                      className="btn btn-sm btn-link p-0"
                                      onClick={() => handleLikeReply(post.id, comment.id, reply.id)}
                                      style={{color: reply.liked ? '#e74c3c' : 'inherit'}}
                                    >
                                      <i className={reply.liked ? "fas fa-heart" : "far fa-heart"} />
                                      {reply.likes > 0 && <span className="ms-1">{reply.likes}</span>}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            {/* Reply Input */}
                            <div 
                              className="d-flex ms-4" 
                              data-reply-id={`${post.id}-${comment.id}`}
                              style={{display: 'none'}}
                            >
                              <img src={user?.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"} alt="Profile" className="rounded-circle me-2" width={30} height={30} />
                              <input 
                                type="text" 
                                className="form-control form-control-sm me-2" 
                                placeholder="Write a reply..." 
                                style={{borderRadius: '15px'}}
                                value={replyInputs[`${post.id}-${comment.id}`] || ''}
                                onChange={(e) => setReplyInputs({...replyInputs, [`${post.id}-${comment.id}`]: e.target.value})}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddReply(post.id, comment.id)}
                              />
                              <button 
                                className="btn btn-sm btn-primary"
                                onClick={() => handleAddReply(post.id, comment.id)}
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        {/* Add Comment Input */}
                        <div className="d-flex">
                          <img src={user?.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"} alt="Profile" className="rounded-circle me-2" width={35} height={35} />
                          <input 
                            type="text" 
                            className="form-control me-2" 
                            placeholder="Write a comment..." 
                            style={{borderRadius: '20px'}}
                            value={commentInputs[post.id] || ''}
                            onChange={(e) => setCommentInputs({...commentInputs, [post.id]: e.target.value})}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                          />
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => handleAddComment(post.id)}
                          >
                            Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="col-lg-4">
                {/* Profile Summary */}
                <div className="card sidebar-card">
                  <div className="card-body text-center">
                    <img src={user?.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"} alt="Profile" className="rounded-circle mb-3" width={80} height={80} />
                    <h5>{user?.name || 'Sarah Johnson'}</h5>
                    <p className="text-muted">@{user?.username || 'sarahjohnson'}</p>
                    <div className="row text-center">
                      <div className="col-4">
                        <strong>142</strong><br /><small className="text-muted">Posts</small>
                      </div>
                      <div className="col-4">
                        <strong>2.5K</strong><br /><small className="text-muted">Followers</small>
                      </div>
                      <div className="col-4">
                        <strong>892</strong><br /><small className="text-muted">Following</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trending Topics */}
                <div className="trending-topics">
                  <h6><i className="fas fa-fire me-2" />Trending for You</h6>
                  <div className="mt-3">
                    <p className="mb-2">#Photography <small>• 125K posts</small></p>
                    <p className="mb-2">#NatureLover <small>• 89K posts</small></p>
                    <p className="mb-2">#CoffeeLife <small>• 67K posts</small></p>
                    <p className="mb-0">#Adventure <small>• 45K posts</small></p>
                  </div>
                </div>

                {/* Suggested Connections */}
                <div className="card sidebar-card">
                  <div className="card-header">
                    <h6><i className="fas fa-user-plus me-2" />People You May Know</h6>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-3" width={50} height={50} />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">John Doe</h6>
                        <small className="text-muted">5 mutual friends</small>
                      </div>
                      <button className="btn btn-sm btn-primary">Follow</button>
                    </div>
                    <div className="d-flex align-items-center">
                      <img src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-3" width={50} height={50} />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">Lisa Wang</h6>
                        <small className="text-muted">3 mutual friends</small>
                      </div>
                      <button className="btn btn-sm btn-primary">Follow</button>
                    </div>
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