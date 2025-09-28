import React from 'react';
// import dotenv from 'dotenv';
// dotenv.config();
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
        <style dangerouslySetInnerHTML={{
          __html: `
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
        <style dangerouslySetInnerHTML={{ __html: "\n        body {\n            background-color: #f8f9fa;\n            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n        }\n        \n        /* Navbar Styles */\n        .navbar {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n            z-index: 1050;\n        }\n        \n        /* Common Card Styles */\n        .card {\n            border: none;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            margin-bottom: 20px;\n        }\n        \n        .btn-primary {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            border: none;\n            border-radius: 25px;\n            padding: 10px 25px;\n        }\n        \n        /* Page Sections */\n        .page-section {\n            display: none;\n            min-height: calc(100vh - 76px);\n            padding-top: 20px;\n        }\n        \n        .page-section.active {\n            display: block;\n        }\n        \n        /* Auth Styles (Login/Signup) */\n        .auth-container {\n            min-height: calc(100vh - 76px);\n            display: flex;\n            align-items: center;\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n        }\n        \n        .auth-card {\n            background: white;\n            border-radius: 20px;\n            box-shadow: 0 20px 40px rgba(0,0,0,0.1);\n            overflow: hidden;\n            max-width: 500px;\n            margin: 0 auto;\n        }\n        \n        .auth-tabs .nav-link {\n            color: #667eea;\n            font-weight: 600;\n            border: none;\n            border-bottom: 3px solid transparent;\n        }\n        \n        .auth-tabs .nav-link.active {\n            color: #667eea;\n            border-bottom-color: #667eea;\n            background: none;\n        }\n        \n        .form-control {\n            border-radius: 10px;\n            border: 2px solid #e9ecef;\n            padding: 12px 15px;\n        }\n        \n        .form-control:focus {\n            border-color: #667eea;\n            box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);\n        }\n        \n        .social-login {\n            border: 2px solid #e9ecef;\n            border-radius: 25px;\n            padding: 10px;\n            text-decoration: none;\n            color: #495057;\n            transition: all 0.3s;\n        }\n        \n        .social-login:hover {\n            border-color: #667eea;\n            color: #667eea;\n        }\n        \n        /* Profile Styles */\n        .profile-header {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n            padding: 60px 0 80px;\n            position: relative;\n        }\n        \n        .profile-card {\n            background: white;\n            border-radius: 20px;\n            box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n            margin-top: -60px;\n            position: relative;\n            z-index: 10;\n        }\n        \n        .profile-avatar {\n            width: 120px;\n            height: 120px;\n            border-radius: 50%;\n            border: 5px solid white;\n            margin-top: -60px;\n        }\n        \n        .stats-card {\n            background: white;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            padding: 20px;\n            text-align: center;\n            border: none;\n        }\n        \n        /* Search Styles */\n        .search-container {\n            background: white;\n            border-radius: 20px;\n            box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n            padding: 30px;\n            margin-bottom: 30px;\n        }\n        \n        .search-box {\n            position: relative;\n        }\n        \n        .search-input {\n            border-radius: 50px;\n            padding: 15px 50px 15px 20px;\n            border: 2px solid #e9ecef;\n            font-size: 16px;\n        }\n        \n        .search-btn {\n            position: absolute;\n            right: 10px;\n            top: 50%;\n            transform: translateY(-50%);\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            border: none;\n            border-radius: 50%;\n            width: 40px;\n            height: 40px;\n            color: white;\n        }\n        \n        .user-card {\n            background: white;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            border: none;\n            margin-bottom: 20px;\n            transition: transform 0.2s;\n        }\n        \n        .user-card:hover {\n            transform: translateY(-5px);\n        }\n        \n        .btn-follow {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            border: none;\n            border-radius: 25px;\n            color: white;\n            padding: 6px 20px;\n        }\n        \n        .trending-card {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n            border-radius: 15px;\n            padding: 20px;\n            margin-bottom: 20px;\n        }\n        \n        /* Notifications Styles */\n        .notifications-header {\n            background: white;\n            border-radius: 20px;\n            box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n            padding: 30px;\n            margin-bottom: 30px;\n        }\n        \n        .notification-item {\n            background: white;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            margin-bottom: 15px;\n            padding: 20px;\n            border-left: 4px solid transparent;\n            transition: all 0.2s;\n        }\n        \n        .notification-item:hover {\n            transform: translateX(5px);\n        }\n        \n        .notification-item.unread {\n            border-left-color: #667eea;\n            background: linear-gradient(90deg, rgba(102, 126, 234, 0.05) 0%, white 20%);\n        }\n        \n        .notification-item.like { border-left-color: #e74c3c; }\n        .notification-item.comment { border-left-color: #3498db; }\n        .notification-item.follow { border-left-color: #2ecc71; }\n        .notification-item.mention { border-left-color: #f39c12; }\n        \n        .notification-icon {\n            width: 40px;\n            height: 40px;\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            color: white;\n            font-size: 16px;\n        }\n        \n        .notification-icon.like { background: #e74c3c; }\n        .notification-icon.comment { background: #3498db; }\n        .notification-icon.follow { background: #2ecc71; }\n        .notification-icon.mention { background: #f39c12; }\n        \n        /* Messages Styles */\n        .messages-container {\n            height: calc(100vh - 96px);\n        }\n        \n        .chat-sidebar {\n            background: white;\n            border-radius: 20px 0 0 20px;\n            box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n            height: 100%;\n            overflow-y: auto;\n        }\n        \n        .chat-main {\n            background: white;\n            border-radius: 0 20px 20px 0;\n            box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n            height: 100%;\n            display: flex;\n            flex-direction: column;\n        }\n        \n        .chat-header {\n            padding: 20px;\n            border-bottom: 1px solid #eee;\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n            border-radius: 0 20px 0 0;\n        }\n        \n        .chat-list {\n            max-height: calc(100vh - 200px);\n            overflow-y: auto;\n        }\n        \n        .chat-item {\n            padding: 15px 20px;\n            border-bottom: 1px solid #f1f1f1;\n            cursor: pointer;\n            transition: all 0.2s;\n        }\n        \n        .chat-item:hover {\n            background: #f8f9fa;\n        }\n        \n        .chat-item.active {\n            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);\n            border-left: 4px solid #667eea;\n        }\n        \n        .chat-messages {\n            flex: 1;\n            padding: 20px;\n            overflow-y: auto;\n            max-height: calc(100vh - 200px);\n        }\n        \n        .message {\n            margin-bottom: 15px;\n            display: flex;\n            align-items: flex-end;\n        }\n        \n        .message.sent {\n            justify-content: flex-end;\n        }\n        \n        .message.sent .message-bubble {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n            margin-left: 50px;\n        }\n        \n        .message.received .message-bubble {\n            background: #f1f1f1;\n            color: #333;\n            margin-right: 50px;\n        }\n        \n        .message-bubble {\n            max-width: 70%;\n            padding: 12px 18px;\n            border-radius: 20px;\n            position: relative;\n        }\n        \n        .message-time {\n            font-size: 12px;\n            color: #999;\n            margin-top: 5px;\n        }\n        \n        .chat-input {\n            padding: 20px;\n            border-top: 1px solid #eee;\n            background: #f8f9fa;\n            border-radius: 0 0 20px 0;\n        }\n        \n        .online-indicator {\n            width: 12px;\n            height: 12px;\n            background: #2ecc71;\n            border-radius: 50%;\n            position: absolute;\n            bottom: 2px;\n            right: 2px;\n            border: 2px solid white;\n        }\n        \n        .unread-badge {\n            background: #667eea;\n            color: white;\n            border-radius: 50%;\n            width: 20px;\n            height: 20px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            font-size: 12px;\n        }\n        \n        /* Settings Styles */\n        .settings-header {\n            background: white;\n            border-radius: 20px;\n            box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n            padding: 30px;\n            margin-bottom: 30px;\n        }\n        \n        .settings-card {\n            background: white;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            border: none;\n            margin-bottom: 20px;\n        }\n        \n        .settings-card .card-header {\n            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);\n            border-bottom: 1px solid rgba(102, 126, 234, 0.2);\n            border-radius: 15px 15px 0 0;\n            font-weight: 600;\n        }\n        \n        .settings-nav .nav-link {\n            color: #6c757d;\n            border: none;\n            border-radius: 10px;\n            margin-bottom: 5px;\n            padding: 12px 15px;\n        }\n        \n        .settings-nav .nav-link.active {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n        }\n        \n        .settings-nav .nav-link:hover {\n            background: rgba(102, 126, 234, 0.1);\n            color: #667eea;\n        }\n        \n        .profile-upload {\n            position: relative;\n            display: inline-block;\n        }\n        \n        .profile-upload input[type=\"file\"] {\n            position: absolute;\n            opacity: 0;\n            width: 100%;\n            height: 100%;\n            cursor: pointer;\n        }\n        \n        .upload-overlay {\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background: rgba(0,0,0,0.5);\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            opacity: 0;\n            transition: opacity 0.3s;\n            cursor: pointer;\n        }\n        \n        .profile-upload:hover .upload-overlay {\n            opacity: 1;\n        }\n        \n        .danger-zone {\n            border: 2px solid #dc3545;\n            border-radius: 15px;\n            background: rgba(220, 53, 69, 0.05);\n        }\n        \n        /* Tab Styles */\n        .nav-tabs .nav-link {\n            color: #6c757d;\n            border: none;\n            border-radius: 25px;\n            margin: 0 5px;\n            padding: 8px 20px;\n        }\n        \n        .nav-tabs .nav-link.active {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n        }\n        \n        .form-check-input:checked {\n            background-color: #667eea;\n            border-color: #667eea;\n        }\n        \n        .brand-logo {\n            color: white;\n            font-size: 1.5rem;\n            font-weight: bold;\n        }\n        \n        /* Dashboard specific styles */\n        .main-content {\n            padding-top: 76px;\n        }\n        \n        .post-card {\n            background: white;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            border: none;\n            margin-bottom: 20px;\n        }\n        \n        .create-post {\n            background: white;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            padding: 20px;\n            margin-bottom: 30px;\n        }\n        \n        .sidebar-card {\n            background: white;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            margin-bottom: 20px;\n        }\n        \n        .story-container {\n            background: white;\n            border-radius: 15px;\n            box-shadow: 0 5px 15px rgba(0,0,0,0.08);\n            padding: 20px;\n            margin-bottom: 30px;\n        }\n        \n        .story-item {\n            text-align: center;\n            cursor: pointer;\n        }\n        \n        .story-avatar {\n            width: 70px;\n            height: 70px;\n            border-radius: 50%;\n            border: 3px solid #667eea;\n            padding: 2px;\n        }\n        \n        .add-story {\n            border: 3px dashed #ccc;\n            background: #f8f9fa;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }\n        \n        .trending-topics {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n            border-radius: 15px;\n            padding: 20px;\n        }\n    " }} />
        {/* Navbar */}
        
        {/* Auth Page (Login/Signup) */}
        <div id="auth-page" className="page-section">
          <div className="auth-container">
            <div className="container">
              <div className="auth-card">
                <div className="p-5">
                  <div className="text-center mb-4">
                    <div style={{ color: '#667eea', fontSize: '2rem', fontWeight: 'bold' }}>
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
       
      </div>
    </AuthProvider>
  );
}

export default App;