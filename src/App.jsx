import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';
import { useState } from 'react'

function App() {
  // State management for posts, comments, and likes
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
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
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
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
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
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
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
  return (
    <AuthProvider>
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SocialApp - Complete</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html: `
        body {
            background-color: #f8f9fa;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        /* Navbar Styles */
        .navbar {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            z-index: 1050;
        }
        
        /* Common Card Styles */
        .card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            margin-bottom: 20px;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 25px;
            padding: 10px 25px;
        }
        
        /* Page Sections */
        .page-section {
            display: none;
            min-height: calc(100vh - 76px);
            padding-top: 20px;
        }
        
        .page-section.active {
            display: block;
        }
        
        /* Auth Styles (Login/Signup) */
        .auth-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .auth-card {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
            max-width: 500px;
            margin: 0 auto;
        }
        
        .auth-tabs .nav-link {
            color: #667eea;
            font-weight: 600;
            border: none;
            border-bottom: 3px solid transparent;
        }
        
        .auth-tabs .nav-link.active {
            color: #667eea;
            border-bottom-color: #667eea;
            background: none;
        }
        
        .form-control {
            border-radius: 10px;
            border: 2px solid #e9ecef;
            padding: 12px 15px;
        }
        
        .form-control:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }
        
        .social-login {
            border: 2px solid #e9ecef;
            border-radius: 25px;
            padding: 10px;
            text-decoration: none;
            color: #495057;
            transition: all 0.3s;
        }
        
        .social-login:hover {
            border-color: #667eea;
            color: #667eea;
        }
        
        /* Brand logo */
        .brand-logo {
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
        }
        
        /* Dashboard specific styles */
        .main-content {
            padding-top: 76px;
        }
        
        .post-card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            border: none;
            margin-bottom: 20px;
        }
        
        .create-post {
            background: white;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            padding: 20px;
            margin-bottom: 30px;
        }
        
        .sidebar-card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            margin-bottom: 20px;
        }
        
        .story-container {
            background: white;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            padding: 20px;
            margin-bottom: 30px;
        }
        
        .story-item {
            text-align: center;
            cursor: pointer;
        }
        
        .story-avatar {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 3px solid #667eea;
            padding: 2px;
        }
        
        .add-story {
            border: 3px dashed #ccc;
            background: #f8f9fa;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .trending-topics {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 15px;
            padding: 20px;
        }
        
        .form-check-input:checked {
            background-color: #667eea;
            border-color: #667eea;
        }
        ` }} />
        
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
        <style dangerouslySetInnerHTML={{__html: "\n        body {\n            background-color: #f8f9fa;\n            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n        }\n        \n        /* Navbar Styles */\n        .navbar {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n            z-index: 1050;\n        }\n        \n        /* Common Card Styles */\n        .card {\n            border: none;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            margin-bottom: 20px;\n        }\n        \n        .btn-primary {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            border: none;\n            border-radius: 25px;\n            padding: 10px 25px;\n        }\n        \n        /* Page Sections */\n        .page-section {\n            display: none;\n            min-height: calc(100vh - 76px);\n            padding-top: 20px;\n        }\n        \n        .page-section.active {\n            display: block;\n        }\n        \n        /* Auth Styles (Login/Signup) */\n        .auth-container {\n            min-height: calc(100vh - 76px);\n            display: flex;\n            align-items: center;\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n        }\n        \n        .auth-card {\n            background: white;\n            border-radius: 20px;\n            box-shadow: 0 20px 40px rgba(0,0,0,0.1);\n            overflow: hidden;\n            max-width: 500px;\n            margin: 0 auto;\n        }\n        \n        .auth-tabs .nav-link {\n            color: #667eea;\n            font-weight: 600;\n            border: none;\n            border-bottom: 3px solid transparent;\n        }\n        \n        .auth-tabs .nav-link.active {\n            color: #667eea;\n            border-bottom-color: #667eea;\n            background: none;\n        }\n        \n        .form-control {\n            border-radius: 10px;\n            border: 2px solid #e9ecef;\n            padding: 12px 15px;\n        }\n        \n        .form-control:focus {\n            border-color: #667eea;\n            box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);\n        }\n        \n        .social-login {\n            border: 2px solid #e9ecef;\n            border-radius: 25px;\n            padding: 10px;\n            text-decoration: none;\n            color: #495057;\n            transition: all 0.3s;\n        }\n        \n        .social-login:hover {\n            border-color: #667eea;\n            color: #667eea;\n        }\n        \n        /* Profile Styles */\n        .profile-header {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n            padding: 60px 0 80px;\n            position: relative;\n        }\n        \n        .profile-card {\n            background: white;\n            border-radius: 20px;\n            box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n            margin-top: -60px;\n            position: relative;\n            z-index: 10;\n        }\n        \n        .profile-avatar {\n            width: 120px;\n            height: 120px;\n            border-radius: 50%;\n            border: 5px solid white;\n            margin-top: -60px;\n        }\n        \n        .stats-card {\n            background: white;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            padding: 20px;\n            text-align: center;\n            border: none;\n        }\n        \n        /* Search Styles */\n        .search-container {\n            background: white;\n            border-radius: 20px;\n            box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n            padding: 30px;\n            margin-bottom: 30px;\n        }\n        \n        .search-box {\n            position: relative;\n        }\n        \n        .search-input {\n            border-radius: 50px;\n            padding: 15px 50px 15px 20px;\n            border: 2px solid #e9ecef;\n            font-size: 16px;\n        }\n        \n        .search-btn {\n            position: absolute;\n            right: 10px;\n            top: 50%;\n            transform: translateY(-50%);\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            border: none;\n            border-radius: 50%;\n            width: 40px;\n            height: 40px;\n            color: white;\n        }\n        \n        .user-card {\n            background: white;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            border: none;\n            margin-bottom: 20px;\n            transition: transform 0.2s;\n        }\n        \n        .user-card:hover {\n            transform: translateY(-5px);\n        }\n        \n        .btn-follow {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            border: none;\n            border-radius: 25px;\n            color: white;\n            padding: 6px 20px;\n        }\n        \n        .trending-card {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n            border-radius: 15px;\n            padding: 20px;\n            margin-bottom: 20px;\n        }\n        \n        /* Notifications Styles */\n        .notifications-header {\n            background: white;\n            border-radius: 20px;\n            box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n            padding: 30px;\n            margin-bottom: 30px;\n        }\n        \n        .notification-item {\n            background: white;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            margin-bottom: 15px;\n            padding: 20px;\n            border-left: 4px solid transparent;\n            transition: all 0.2s;\n        }\n        \n        .notification-item:hover {\n            transform: translateX(5px);\n        }\n        \n        .notification-item.unread {\n            border-left-color: #667eea;\n            background: linear-gradient(90deg, rgba(102, 126, 234, 0.05) 0%, white 20%);\n        }\n        \n        .notification-item.like { border-left-color: #e74c3c; }\n        .notification-item.comment { border-left-color: #3498db; }\n        .notification-item.follow { border-left-color: #2ecc71; }\n        .notification-item.mention { border-left-color: #f39c12; }\n        \n        .notification-icon {\n            width: 40px;\n            height: 40px;\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            color: white;\n            font-size: 16px;\n        }\n        \n        .notification-icon.like { background: #e74c3c; }\n        .notification-icon.comment { background: #3498db; }\n        .notification-icon.follow { background: #2ecc71; }\n        .notification-icon.mention { background: #f39c12; }\n        \n        /* Messages Styles */\n        .messages-container {\n            height: calc(100vh - 96px);\n        }\n        \n        .chat-sidebar {\n            background: white;\n            border-radius: 20px 0 0 20px;\n            box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n            height: 100%;\n            overflow-y: auto;\n        }\n        \n        .chat-main {\n            background: white;\n            border-radius: 0 20px 20px 0;\n            box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n            height: 100%;\n            display: flex;\n            flex-direction: column;\n        }\n        \n        .chat-header {\n            padding: 20px;\n            border-bottom: 1px solid #eee;\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n            border-radius: 0 20px 0 0;\n        }\n        \n        .chat-list {\n            max-height: calc(100vh - 200px);\n            overflow-y: auto;\n        }\n        \n        .chat-item {\n            padding: 15px 20px;\n            border-bottom: 1px solid #f1f1f1;\n            cursor: pointer;\n            transition: all 0.2s;\n        }\n        \n        .chat-item:hover {\n            background: #f8f9fa;\n        }\n        \n        .chat-item.active {\n            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);\n            border-left: 4px solid #667eea;\n        }\n        \n        .chat-messages {\n            flex: 1;\n            padding: 20px;\n            overflow-y: auto;\n            max-height: calc(100vh - 200px);\n        }\n        \n        .message {\n            margin-bottom: 15px;\n            display: flex;\n            align-items: flex-end;\n        }\n        \n        .message.sent {\n            justify-content: flex-end;\n        }\n        \n        .message.sent .message-bubble {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n            margin-left: 50px;\n        }\n        \n        .message.received .message-bubble {\n            background: #f1f1f1;\n            color: #333;\n            margin-right: 50px;\n        }\n        \n        .message-bubble {\n            max-width: 70%;\n            padding: 12px 18px;\n            border-radius: 20px;\n            position: relative;\n        }\n        \n        .message-time {\n            font-size: 12px;\n            color: #999;\n            margin-top: 5px;\n        }\n        \n        .chat-input {\n            padding: 20px;\n            border-top: 1px solid #eee;\n            background: #f8f9fa;\n            border-radius: 0 0 20px 0;\n        }\n        \n        .online-indicator {\n            width: 12px;\n            height: 12px;\n            background: #2ecc71;\n            border-radius: 50%;\n            position: absolute;\n            bottom: 2px;\n            right: 2px;\n            border: 2px solid white;\n        }\n        \n        .unread-badge {\n            background: #667eea;\n            color: white;\n            border-radius: 50%;\n            width: 20px;\n            height: 20px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            font-size: 12px;\n        }\n        \n        /* Settings Styles */\n        .settings-header {\n            background: white;\n            border-radius: 20px;\n            box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n            padding: 30px;\n            margin-bottom: 30px;\n        }\n        \n        .settings-card {\n            background: white;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            border: none;\n            margin-bottom: 20px;\n        }\n        \n        .settings-card .card-header {\n            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);\n            border-bottom: 1px solid rgba(102, 126, 234, 0.2);\n            border-radius: 15px 15px 0 0;\n            font-weight: 600;\n        }\n        \n        .settings-nav .nav-link {\n            color: #6c757d;\n            border: none;\n            border-radius: 10px;\n            margin-bottom: 5px;\n            padding: 12px 15px;\n        }\n        \n        .settings-nav .nav-link.active {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n        }\n        \n        .settings-nav .nav-link:hover {\n            background: rgba(102, 126, 234, 0.1);\n            color: #667eea;\n        }\n        \n        .profile-upload {\n            position: relative;\n            display: inline-block;\n        }\n        \n        .profile-upload input[type=\"file\"] {\n            position: absolute;\n            opacity: 0;\n            width: 100%;\n            height: 100%;\n            cursor: pointer;\n        }\n        \n        .upload-overlay {\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background: rgba(0,0,0,0.5);\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            opacity: 0;\n            transition: opacity 0.3s;\n            cursor: pointer;\n        }\n        \n        .profile-upload:hover .upload-overlay {\n            opacity: 1;\n        }\n        \n        .danger-zone {\n            border: 2px solid #dc3545;\n            border-radius: 15px;\n            background: rgba(220, 53, 69, 0.05);\n        }\n        \n        /* Tab Styles */\n        .nav-tabs .nav-link {\n            color: #6c757d;\n            border: none;\n            border-radius: 25px;\n            margin: 0 5px;\n            padding: 8px 20px;\n        }\n        \n        .nav-tabs .nav-link.active {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n        }\n        \n        .form-check-input:checked {\n            background-color: #667eea;\n            border-color: #667eea;\n        }\n        \n        .brand-logo {\n            color: white;\n            font-size: 1.5rem;\n            font-weight: bold;\n        }\n        \n        /* Dashboard specific styles */\n        .main-content {\n            padding-top: 76px;\n        }\n        \n        .post-card {\n            background: white;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            border: none;\n            margin-bottom: 20px;\n        }\n        \n        .create-post {\n            background: white;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            padding: 20px;\n            margin-bottom: 30px;\n        }\n        \n        .sidebar-card {\n            background: white;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            margin-bottom: 20px;\n        }\n        \n        .story-container {\n            background: white;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            padding: 20px;\n            margin-bottom: 30px;\n        }\n        \n        .story-item {\n            text-align: center;\n            cursor: pointer;\n        }\n        \n        .story-avatar {\n            width: 70px;\n            height: 70px;\n            border-radius: 50%;\n            border: 3px solid #667eea;\n            padding: 2px;\n        }\n        \n        .add-story {\n            border: 3px dashed #ccc;\n            background: #f8f9fa;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }\n        \n        .trending-topics {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n            border-radius: 15px;\n            padding: 20px;\n        }\n    " }} />
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
          <div className="container">
            <a className="navbar-brand brand-logo" href="#" onclick="showPage('dashboard')">
              <i className="fas fa-share-alt me-2" />SocialApp
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#" onclick="showPage('dashboard')">
                    <i className="fas fa-home me-1" />Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onclick="showPage('profile')">
                    <i className="fas fa-user me-1" />Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onclick="showPage('search')">
                    <i className="fas fa-search me-1" />Search
                  </a>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#" onclick="showPage('notifications')">
                    <i className="fas fa-bell" />
                    <span className="badge bg-danger rounded-pill ms-1">3</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onclick="showPage('messages')">
                    <i className="fas fa-envelope" />
                    <span className="badge bg-danger rounded-pill ms-1">2</span>
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                    <img src="https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Profile" className="rounded-circle" width={30} height={30} />
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onclick="showPage('profile')">
                        <i className="fas fa-user me-2" />Profile
                      </a></li>
                    <li><a className="dropdown-item" href="#" onclick="showPage('settings')">
                        <i className="fas fa-cog me-2" />Settings
                      </a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#" onclick="showPage('auth')">
                        <i className="fas fa-sign-out-alt me-2" />Logout
                      </a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Auth Page (Login/Signup) */}
        <div id="auth-page" className="page-section">
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
                      <button className="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login">Login</button>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link" id="signup-tab" data-bs-toggle="tab" data-bs-target="#signup">Sign Up</button>
                    </li>
                  </ul>
                  <div className="tab-content">
                    {/* Login Tab */}
                    <div className="tab-pane fade show active" id="login">
                      <form>
                        <div className="mb-3">
                          <input type="email" className="form-control" placeholder="Email Address" required />
                        </div>
                        <div className="mb-3">
                          <input type="password" className="form-control" placeholder="Password" required />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="remember" />
                            <label className="form-check-label" htmlFor="remember">Remember me</label>
                          </div>
                          <a href="#" className="text-decoration-none">Forgot Password?</a>
                        </div>
                        <button type="button" className="btn btn-primary w-100 mb-3" onclick="showPage('dashboard')">Login</button>
                      </form>
                    </div>
                    {/* Sign Up Tab */}
                    <div className="tab-pane fade" id="signup">
                      <form>
                        <div className="row mb-3">
                          <div className="col-6">
                            <input type="text" className="form-control" placeholder="First Name" required />
                          </div>
                          <div className="col-6">
                            <input type="text" className="form-control" placeholder="Last Name" required />
                          </div>
                        </div>
                        <div className="mb-3">
                          <input type="email" className="form-control" placeholder="Email Address" required />
                        </div>
                        <div className="mb-3">
                          <input type="password" className="form-control" placeholder="Password" required />
                        </div>
                        <div className="mb-3">
                          <input type="password" className="form-control" placeholder="Confirm Password" required />
                        </div>
                        <div className="form-check mb-3">
                          <input className="form-check-input" type="checkbox" id="terms" required />
                          <label className="form-check-label" htmlFor="terms">
                            I agree to the <a href="#" className="text-decoration-none">Terms &amp; Conditions</a>
                          </label>
                        </div>
                        <button type="button" className="btn btn-primary w-100 mb-3" onclick="showPage('dashboard')">Sign Up</button>
                      </form>
                    </div>
                  </div>
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
                    <button className="btn btn-outline-secondary" onclick="showPage('dashboard')">
                      Continue as Guest
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Dashboard Page */}
        <div id="dashboard-page" className="page-section active">
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
                          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Story" className="story-avatar" />
                          <small>John</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Create Post */}
                  <div className="create-post">
                    <div className="d-flex align-items-center mb-3">
                      <img src="https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Profile" className="rounded-circle me-3" width={50} height={50} />
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="What's on your mind, Sarah?" 
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
                                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Profile" className="rounded-circle me-2" width={30} height={30} />
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
                            <img src="https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Profile" className="rounded-circle me-2" width={35} height={35} />
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
                      <img src="https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Profile" className="rounded-circle mb-3" width={80} height={80} />
                      <h5>Sarah Johnson</h5>
                      <p className="text-muted">@sarahjohnson</p>
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
        {/* Profile Page */}
        <div id="profile-page" className="page-section">
          <div className="profile-header">
            <div className="container text-center">
              <h1>Sarah Johnson</h1>
              <p className="lead">Photography enthusiast | Nature lover | Coffee addict</p>
            </div>
          </div>
          <div className="container">
            <div className="profile-card p-4 mb-4">
              <div className="text-center">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Profile" className="profile-avatar" />
                <h3 className="mt-3">Sarah Johnson</h3>
                <p className="text-muted">@sarahjohnson</p>
                <p>📍 Diamond Harbour, West Bengal, India</p>
                <button className="btn btn-primary me-2">Edit Profile</button>
                <button className="btn btn-outline-secondary">Share Profile</button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="row mb-4">
                  <div className="col-4">
                    <div className="stats-card">
                      <h4>142</h4>
                      <small className="text-muted">Posts</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="stats-card">
                      <h4>2.5K</h4>
                      <small className="text-muted">Followers</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="stats-card">
                      <h4>892</h4>
                      <small className="text-muted">Following</small>
                    </div>
                  </div>
                </div>
                <div className="card post-card">
                  <div className="card-body">
                    <h6><i className="fas fa-info-circle me-2" />About</h6>
                    <p className="text-muted">Passionate photographer capturing life's beautiful moments. Love hiking, coffee, and meeting new people!</p>
                    <hr />
                    <p><i className="fas fa-birthday-cake me-2" />Joined March 2023</p>
                    <p><i className="fas fa-link me-2" /><a href="#">portfolio.sarahjohnson.com</a></p>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <ul className="nav nav-tabs mb-4">
                  <li className="nav-item">
                    <a className="nav-link active" href="#posts" data-bs-toggle="tab">Posts</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#photos" data-bs-toggle="tab">Photos</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#videos" data-bs-toggle="tab">Videos</a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="posts">
                    <div className="card post-card">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <img src="https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Profile" className="rounded-circle me-3" width={50} height={50} />
                          <div>
                            <h6 className="mb-0">Sarah Johnson</h6>
                            <small className="text-muted">2 hours ago</small>
                          </div>
                        </div>
                        <p>Just finished an amazing hike in the mountains! The view was absolutely breathtaking 🏔️ #NatureLover #Adventure</p>
                        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="img-fluid rounded mb-3" alt="Mountain view" />
                        <div className="d-flex justify-content-between">
                          <button className="btn btn-link text-decoration-none">
                            <i className="far fa-heart me-1" />42 Likes
                          </button>
                          <button className="btn btn-link text-decoration-none">
                            <i className="far fa-comment me-1" />8 Comments
                          </button>
                          <button className="btn btn-link text-decoration-none">
                            <i className="fas fa-share me-1" />Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="photos">
                    <div className="row g-2">
                      <div className="col-6 col-md-4">
                        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" className="img-fluid rounded" />
                      </div>
                      <div className="col-6 col-md-4">
                        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" className="img-fluid rounded" />
                      </div>
                      <div className="col-6 col-md-4">
                        <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" className="img-fluid rounded" />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="videos">
                    <p className="text-center text-muted py-5">No videos uploaded yet.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Search Page */}
        <div id="search-page" className="page-section">
          <div className="container" style={{paddingTop: '20px'}}>
            <div className="search-container">
              <h2 className="mb-4 text-center">Discover &amp; Connect</h2>
              <div className="search-box">
                <input type="text" className="form-control search-input" placeholder="Search for people, posts, or hashtags..." />
                <button className="search-btn" type="button">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8">
                <ul className="nav nav-tabs mb-4">
                  <li className="nav-item">
                    <a className="nav-link active" href="#search-all" data-bs-toggle="tab">All</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#search-people" data-bs-toggle="tab">People</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#search-posts" data-bs-toggle="tab">Posts</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#search-hashtags" data-bs-toggle="tab">Hashtags</a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="search-all">
                    <div className="card user-card">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-3" width={60} height={60} />
                          <div className="flex-grow-1">
                            <h6 className="mb-1">Mike Chen</h6>
                            <p className="text-muted mb-1">@mikechen</p>
                            <small className="text-muted">Photographer • 2.1K followers</small>
                          </div>
                          <button className="btn btn-follow">Follow</button>
                        </div>
                      </div>
                    </div>
                    <div className="card post-card">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Profile" className="rounded-circle me-3" width={50} height={50} />
                          <div>
                            <h6 className="mb-0">Emily Davis</h6>
                            <small className="text-muted">3 hours ago</small>
                          </div>
                        </div>
                        <p>Amazing sunset at the beach today! 🌅 #Sunset #Beach #Photography</p>
                        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="img-fluid rounded mb-3" alt="Sunset" />
                        <div className="d-flex justify-content-between">
                          <button className="btn btn-link text-decoration-none">
                            <i className="far fa-heart me-1" />125 Likes
                          </button>
                          <button className="btn btn-link text-decoration-none">
                            <i className="far fa-comment me-1" />23 Comments
                          </button>
                          <button className="btn btn-link text-decoration-none">
                            <i className="fas fa-share me-1" />Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="search-people">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="card user-card">
                          <div className="card-body text-center">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle mb-3" width={80} height={80} />
                            <h6>Mike Chen</h6>
                            <p className="text-muted">@mikechen</p>
                            <p><small>2.1K followers • 542 following</small></p>
                            <button className="btn btn-follow">Follow</button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card user-card">
                          <div className="card-body text-center">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle mb-3" width={80} height={80} />
                            <h6>Emily Davis</h6>
                            <p className="text-muted">@emilydavis</p>
                            <p><small>1.8K followers • 324 following</small></p>
                            <button className="btn btn-follow">Follow</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="search-posts">
                    <div className="card post-card">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Profile" className="rounded-circle me-3" width={50} height={50} />
                          <div>
                            <h6 className="mb-0">Mike Chen</h6>
                            <small className="text-muted">1 hour ago</small>
                          </div>
                        </div>
                        <p>Coffee and code - perfect combination for a productive morning! ☕💻 #CoffeeLife #Programming</p>
                        <div className="d-flex justify-content-between">
                          <button className="btn btn-link text-decoration-none">
                            <i className="far fa-heart me-1" />89 Likes
                          </button>
                          <button className="btn btn-link text-decoration-none">
                            <i className="far fa-comment me-1" />15 Comments
                          </button>
                          <button className="btn btn-link text-decoration-none">
                            <i className="fas fa-share me-1" />Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="search-hashtags">
                    <div className="list-group">
                      <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">#Photography</h6>
                          <small>125K posts</small>
                        </div>
                        <span className="badge bg-primary rounded-pill">Trending</span>
                      </a>
                      <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">#Nature</h6>
                          <small>98K posts</small>
                        </div>
                      </a>
                      <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">#Coffee</h6>
                          <small>67K posts</small>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="trending-card">
                  <h5><i className="fas fa-fire me-2" />Trending Now</h5>
                  <div className="mt-3">
                    <p className="mb-2"><strong>#Photography</strong><br /><small>125K posts</small></p>
                    <p className="mb-2"><strong>#Nature</strong><br /><small>98K posts</small></p>
                    <p className="mb-0"><strong>#Coffee</strong><br /><small>67K posts</small></p>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h6><i className="fas fa-user-plus me-2" />Suggested for You</h6>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-3" width={40} height={40} />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">John Doe</h6>
                        <small className="text-muted">@johndoe</small>
                      </div>
                      <button className="btn btn-sm btn-follow">Follow</button>
                    </div>
                    <div className="d-flex align-items-center">
                      <img src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-3" width={40} height={40} />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">Lisa Wang</h6>
                        <small className="text-muted">@lisawang</small>
                      </div>
                      <button className="btn btn-sm btn-follow">Follow</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Notifications Page */}
        <div id="notifications-page" className="page-section">
          <div className="container" style={{paddingTop: '20px'}}>
            <div className="notifications-header">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h2><i className="fas fa-bell me-2" />Notifications</h2>
                  <p className="text-muted mb-0">Stay updated with your latest activity</p>
                </div>
                <button className="btn" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '25px', padding: '8px 20px'}}>Mark All as Read</button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8">
                <ul className="nav nav-tabs mb-4">
                  <li className="nav-item">
                    <a className="nav-link active" href="#notif-all" data-bs-toggle="tab">All</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#notif-unread" data-bs-toggle="tab">Unread <span className="badge bg-danger">3</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#notif-likes" data-bs-toggle="tab">Likes</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#notif-comments" data-bs-toggle="tab">Comments</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#notif-follows" data-bs-toggle="tab">Follows</a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="notif-all">
                    <div className="notification-item unread like">
                      <div className="d-flex align-items-center">
                        <div className="notification-icon like me-3">
                          <i className="fas fa-heart" />
                        </div>
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-3" width={50} height={50} />
                        <div className="flex-grow-1">
                          <p className="mb-1"><strong>Mike Chen</strong> liked your post about mountain hiking.</p>
                          <small className="text-muted">2 minutes ago</small>
                        </div>
                        <div className="text-end">
                          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Post" className="rounded" width={60} height={60} />
                        </div>
                      </div>
                    </div>
                    <div className="notification-item unread comment">
                      <div className="d-flex align-items-center">
                        <div className="notification-icon comment me-3">
                          <i className="fas fa-comment" />
                        </div>
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-3" width={50} height={50} />
                        <div className="flex-grow-1">
                          <p className="mb-1"><strong>Emily Davis</strong> commented: "Wow! Where is this exactly? Looks incredible! 😍"</p>
                          <small className="text-muted">5 minutes ago</small>
                        </div>
                        <div className="text-end">
                          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Post" className="rounded" width={60} height={60} />
                        </div>
                      </div>
                    </div>
                    <div className="notification-item unread follow">
                      <div className="d-flex align-items-center">
                        <div className="notification-icon follow me-3">
                          <i className="fas fa-user-plus" />
                        </div>
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-3" width={50} height={50} />
                        <div className="flex-grow-1">
                          <p className="mb-1"><strong>John Doe</strong> started following you.</p>
                          <small className="text-muted">10 minutes ago</small>
                        </div>
                        <div className="text-end">
                          <button className="btn btn-sm btn-outline-primary">Follow Back</button>
                        </div>
                      </div>
                    </div>
                    <div className="notification-item like">
                      <div className="d-flex align-items-center">
                        <div className="notification-icon like me-3">
                          <i className="fas fa-heart" />
                        </div>
                        <img src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-3" width={50} height={50} />
                        <div className="flex-grow-1">
                          <p className="mb-1"><strong>Lisa Wang</strong> and <strong>2 others</strong> liked your coffee shop post.</p>
                          <small className="text-muted">1 hour ago</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="notif-unread">
                    <div className="notification-item unread like">
                      <div className="d-flex align-items-center">
                        <div className="notification-icon like me-3">
                          <i className="fas fa-heart" />
                        </div>
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-3" width={50} height={50} />
                        <div className="flex-grow-1">
                          <p className="mb-1"><strong>Mike Chen</strong> liked your post.</p>
                          <small className="text-muted">2 minutes ago</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="notif-likes">
                    <div className="notification-item like">
                      <div className="d-flex align-items-center">
                        <div className="notification-icon like me-3">
                          <i className="fas fa-heart" />
                        </div>
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-3" width={50} height={50} />
                        <div className="flex-grow-1">
                          <p className="mb-1"><strong>Mike Chen</strong> liked your post.</p>
                          <small className="text-muted">2 minutes ago</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="notif-comments">
                    <div className="notification-item comment">
                      <div className="d-flex align-items-center">
                        <div className="notification-icon comment me-3">
                          <i className="fas fa-comment" />
                        </div>
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-3" width={50} height={50} />
                        <div className="flex-grow-1">
                          <p className="mb-1"><strong>Emily Davis</strong> commented on your post.</p>
                          <small className="text-muted">5 minutes ago</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="notif-follows">
                    <div className="notification-item follow">
                      <div className="d-flex align-items-center">
                        <div className="notification-icon follow me-3">
                          <i className="fas fa-user-plus" />
                        </div>
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-3" width={50} height={50} />
                        <div className="flex-grow-1">
                          <p className="mb-1"><strong>John Doe</strong> started following you.</p>
                          <small className="text-muted">10 minutes ago</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-header">
                    <h6><i className="fas fa-cog me-2" />Notification Settings</h6>
                  </div>
                  <div className="card-body">
                    <div className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" id="likesNotif" defaultChecked />
                      <label className="form-check-label" htmlFor="likesNotif">Likes</label>
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" id="commentsNotif" defaultChecked />
                      <label className="form-check-label" htmlFor="commentsNotif">Comments</label>
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" id="followsNotif" defaultChecked />
                      <label className="form-check-label" htmlFor="followsNotif">New Followers</label>
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" id="mentionsNotif" defaultChecked />
                      <label className="form-check-label" htmlFor="mentionsNotif">Mentions</label>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="emailNotif" />
                      <label className="form-check-label" htmlFor="emailNotif">Email Notifications</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Messages Page */}
        <div id="messages-page" className="page-section">
          <div className="container-fluid" style={{paddingTop: '20px'}}>
            <div className="messages-container">
              <div className="row h-100 g-0">
                <div className="col-md-4 col-lg-3">
                  <div className="chat-sidebar">
                    <div style={{padding: '20px', borderBottom: '1px solid #eee'}}>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0"><i className="fas fa-envelope me-2" />Messages</h5>
                        <button className="btn btn-sm btn-outline-primary rounded-circle">
                          <i className="fas fa-edit" />
                        </button>
                      </div>
                      <input type="text" className="form-control" placeholder="Search conversations..." style={{borderRadius: '25px', border: '2px solid #e9ecef', padding: '10px 20px'}} />
                    </div>
                    <div className="chat-list">
                      <div className="chat-item active">
                        <div className="d-flex align-items-center">
                          <div className="position-relative me-3">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle" width={50} height={50} />
                            <div className="online-indicator" />
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-0">Mike Chen</h6>
                            <p className="text-muted mb-0 small">Hey! How was the hike?</p>
                          </div>
                          <div className="text-end">
                            <small className="text-muted">2m</small>
                            <div className="unread-badge mt-1">2</div>
                          </div>
                        </div>
                      </div>
                      <div className="chat-item">
                        <div className="d-flex align-items-center">
                          <div className="position-relative me-3">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle" width={50} height={50} />
                            <div className="online-indicator" />
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-0">Emily Davis</h6>
                            <p className="text-muted mb-0 small">Thanks for the coffee recommendation!</p>
                          </div>
                          <div className="text-end">
                            <small className="text-muted">1h</small>
                          </div>
                        </div>
                      </div>
                      <div className="chat-item">
                        <div className="d-flex align-items-center">
                          <div className="position-relative me-3">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle" width={50} height={50} />
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-0">John Doe</h6>
                            <p className="text-muted mb-0 small">Looking forward to the photoshoot!</p>
                          </div>
                          <div className="text-end">
                            <small className="text-muted">3h</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8 col-lg-9">
                  <div className="chat-main">
                    <div className="chat-header">
                      <div className="d-flex align-items-center">
                        <div className="position-relative me-3">
                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle" width={50} height={50} />
                          <div className="online-indicator" />
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="mb-0">Mike Chen</h5>
                          <small className="opacity-75">Online now</small>
                        </div>
                        <div>
                          <button className="btn btn-outline-light btn-sm me-2">
                            <i className="fas fa-phone" />
                          </button>
                          <button className="btn btn-outline-light btn-sm me-2">
                            <i className="fas fa-video" />
                          </button>
                          <button className="btn btn-outline-light btn-sm">
                            <i className="fas fa-info-circle" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="chat-messages">
                      <div className="message received">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-2" width={35} height={35} />
                        <div>
                          <div className="message-bubble">
                            Hey Sarah! Saw your mountain hiking post. Absolutely stunning! 🏔️
                          </div>
                          <div className="message-time">10:30 AM</div>
                        </div>
                      </div>
                      <div className="message sent">
                        <div>
                          <div className="message-bubble">
                            Thanks Mike! It was an amazing experience. The view from the top was breathtaking! 😍
                          </div>
                          <div className="message-time text-end">10:32 AM</div>
                        </div>
                      </div>
                      <div className="message received">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-2" width={35} height={35} />
                        <div>
                          <div className="message-bubble">
                            Which trail did you take? I'm planning a hiking trip next weekend and looking for recommendations.
                          </div>
                          <div className="message-time">10:35 AM</div>
                        </div>
                      </div>
                      <div className="message sent">
                        <div>
                          <div className="message-bubble">
                            It was the Eagle Peak Trail! Definitely recommend it. The difficulty level is moderate and the scenery is incredible throughout the hike.
                          </div>
                          <div className="message-time text-end">10:38 AM</div>
                        </div>
                      </div>
                      <div className="message received">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-2" width={35} height={35} />
                        <div>
                          <div className="message-bubble">
                            Perfect! How long did it take you to complete?
                          </div>
                          <div className="message-time">10:40 AM</div>
                        </div>
                      </div>
                      <div className="message sent">
                        <div>
                          <div className="message-bubble">
                            About 4 hours round trip with plenty of photo stops! 📸
                          </div>
                          <div className="message-time text-end">10:42 AM</div>
                        </div>
                      </div>
                      <div className="message received">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="User" className="rounded-circle me-2" width={35} height={35} />
                        <div>
                          <div className="message-bubble">
                            Awesome! Thanks for the info. Maybe we could plan a group hike sometime? 🥾
                          </div>
                          <div className="message-time">Just now</div>
                        </div>
                      </div>
                    </div>
                    <div className="chat-input">
                      <div className="input-group">
                        <button className="btn btn-outline-secondary" type="button">
                          <i className="fas fa-paperclip" />
                        </button>
                        <input type="text" className="form-control" placeholder="Type your message..." aria-label="Message" />
                        <button className="btn" type="button" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white'}}>
                          <i className="fas fa-paper-plane" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Settings Page */}
        <div id="settings-page" className="page-section">
          <div className="container" style={{paddingTop: '20px'}}>
            <div className="settings-header">
              <h2><i className="fas fa-cog me-2" />Settings</h2>
              <p className="text-muted mb-0">Manage your account settings and preferences</p>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <div className="card settings-card">
                  <div className="card-body p-0">
                    <nav className="nav flex-column settings-nav p-3">
                      <a className="nav-link active" href="#account" data-bs-toggle="tab">
                        <i className="fas fa-user me-2" />Account
                      </a>
                      <a className="nav-link" href="#privacy" data-bs-toggle="tab">
                        <i className="fas fa-shield-alt me-2" />Privacy
                      </a>
                      <a className="nav-link" href="#notifications-settings" data-bs-toggle="tab">
                        <i className="fas fa-bell me-2" />Notifications
                      </a>
                      <a className="nav-link" href="#security" data-bs-toggle="tab">
                        <i className="fas fa-lock me-2" />Security
                      </a>
                      <a className="nav-link" href="#appearance" data-bs-toggle="tab">
                        <i className="fas fa-palette me-2" />Appearance
                      </a>
                      <a className="nav-link" href="#data" data-bs-toggle="tab">
                        <i className="fas fa-database me-2" />Data &amp; Privacy
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="account">
                    <div className="card settings-card">
                      <div className="card-header">
                        <h5 className="mb-0"><i className="fas fa-user me-2" />Account Information</h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-4 text-center mb-4">
                            <div className="profile-upload">
                              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Profile" className="rounded-circle" width={120} height={120} />
                              <input type="file" accept="image/*" />
                              <div className="upload-overlay">
                                <i className="fas fa-camera text-white fa-2x" />
                              </div>
                            </div>
                            <p className="mt-3 text-muted">Click to change profile picture</p>
                          </div>
                          <div className="col-md-8">
                            <form>
                              <div className="row mb-3">
                                <div className="col-md-6">
                                  <label className="form-label">First Name</label>
                                  <input type="text" className="form-control" defaultValue="Sarah" />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">Last Name</label>
                                  <input type="text" className="form-control" defaultValue="Johnson" />
                                </div>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input type="text" className="form-control" defaultValue="@sarahjohnson" />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" defaultValue="sarah.johnson@email.com" />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Bio</label>
                                <textarea className="form-control" rows={3} defaultValue={"Photography enthusiast | Nature lover | Coffee addict"} />
                              </div>
                              <div className="row mb-3">
                                <div className="col-md-6">
                                  <label className="form-label">Location</label>
                                  <input type="text" className="form-control" defaultValue="Diamond Harbour, West Bengal, India" />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">Website</label>
                                  <input type="url" className="form-control" defaultValue="portfolio.sarahjohnson.com" />
                                </div>
                              </div>
                              <button type="submit" className="btn btn-primary">Save Changes</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="privacy">
                    <div className="card settings-card">
                      <div className="card-header">
                        <h5 className="mb-0"><i className="fas fa-shield-alt me-2" />Privacy Settings</h5>
                      </div>
                      <div className="card-body">
                        <div className="mb-4">
                          <h6>Profile Visibility</h6>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="profileVisibility" id="public" defaultChecked />
                            <label className="form-check-label" htmlFor="public">
                              <strong>Public</strong><br />
                              <small className="text-muted">Anyone can see your profile and posts</small>
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="profileVisibility" id="private" />
                            <label className="form-check-label" htmlFor="private">
                              <strong>Private</strong><br />
                              <small className="text-muted">Only approved followers can see your posts</small>
                            </label>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h6>Who can contact you?</h6>
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="allowMessages" defaultChecked />
                            <label className="form-check-label" htmlFor="allowMessages">Allow direct messages</label>
                          </div>
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="allowTags" defaultChecked />
                            <label className="form-check-label" htmlFor="allowTags">Allow tags in posts</label>
                          </div>
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="allowSearch" />
                            <label className="form-check-label" htmlFor="allowSearch">Allow search engines to find your profile</label>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Save Privacy Settings</button>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="notifications-settings">
                    <div className="card settings-card">
                      <div className="card-header">
                        <h5 className="mb-0"><i className="fas fa-bell me-2" />Notification Preferences</h5>
                      </div>
                      <div className="card-body">
                        <div className="mb-4">
                          <h6>Push Notifications</h6>
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="pushLikes" defaultChecked />
                            <label className="form-check-label" htmlFor="pushLikes">Likes on your posts</label>
                          </div>
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="pushComments" defaultChecked />
                            <label className="form-check-label" htmlFor="pushComments">Comments on your posts</label>
                          </div>
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="pushFollows" defaultChecked />
                            <label className="form-check-label" htmlFor="pushFollows">New followers</label>
                          </div>
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="pushMessages" defaultChecked />
                            <label className="form-check-label" htmlFor="pushMessages">Direct messages</label>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h6>Email Notifications</h6>
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="emailDigest" />
                            <label className="form-check-label" htmlFor="emailDigest">Weekly digest</label>
                          </div>
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="emailSecurity" defaultChecked />
                            <label className="form-check-label" htmlFor="emailSecurity">Security alerts</label>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Save Notification Settings</button>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="security">
                    <div className="card settings-card">
                      <div className="card-header">
                        <h5 className="mb-0"><i className="fas fa-lock me-2" />Security Settings</h5>
                      </div>
                      <div className="card-body">
                        <div className="mb-4">
                          <h6>Change Password</h6>
                          <form>
                            <div className="mb-3">
                              <label className="form-label">Current Password</label>
                              <input type="password" className="form-control" />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">New Password</label>
                              <input type="password" className="form-control" />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Confirm New Password</label>
                              <input type="password" className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-primary">Change Password</button>
                          </form>
                        </div>
                        <hr />
                        <div className="mb-4">
                          <h6>Two-Factor Authentication</h6>
                          <p className="text-muted">Add an extra layer of security to your account</p>
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="twoFactor" />
                            <label className="form-check-label" htmlFor="twoFactor">Enable Two-Factor Authentication</label>
                          </div>
                          <button className="btn btn-outline-primary mt-2">Setup 2FA</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="appearance">
                    <div className="card settings-card">
                      <div className="card-header">
                        <h5 className="mb-0"><i className="fas fa-palette me-2" />Appearance</h5>
                      </div>
                      <div className="card-body">
                        <div className="mb-4">
                          <h6>Theme</h6>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="theme" id="lightTheme" defaultChecked />
                            <label className="form-check-label" htmlFor="lightTheme">Light Mode</label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="theme" id="darkTheme" />
                            <label className="form-check-label" htmlFor="darkTheme">Dark Mode</label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="theme" id="autoTheme" />
                            <label className="form-check-label" htmlFor="autoTheme">Auto (System Default)</label>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h6>Language</h6>
                          <select className="form-select">
                            <option value="en" selected>English</option>
                            <option value="hi">Hindi</option>
                            <option value="bn">Bengali</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                          </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Save Appearance Settings</button>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="data">
                    <div className="card settings-card">
                      <div className="card-header">
                        <h5 className="mb-0"><i className="fas fa-database me-2" />Data &amp; Privacy</h5>
                      </div>
                      <div className="card-body">
                        <div className="mb-4">
                          <h6>Download Your Data</h6>
                          <p className="text-muted">Get a copy of your information</p>
                          <button className="btn btn-outline-primary">Request Download</button>
                        </div>
                        <div className="danger-zone p-4">
                          <h6 className="text-danger"><i className="fas fa-exclamation-triangle me-2" />Danger Zone</h6>
                          <div className="mb-3">
                            <h6>Deactivate Account</h6>
                            <p className="text-muted mb-2">Temporarily disable your account. You can reactivate it anytime.</p>
                            <button className="btn btn-outline-warning">Deactivate Account</button>
                          </div>
                          <hr />
                          <div>
                            <h6>Delete Account</h6>
                            <p className="text-muted mb-2">Permanently delete your account and all your data. This action cannot be undone.</p>
                            <button className="btn btn-danger">Delete Account</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;