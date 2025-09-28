import axios from "axios";
import { mockAuthAPI } from "./mockAuth.js";

// Base API URL - you can configure this in environment variables
const API_BASE_URL = "api/"; // Adjust this to your backend URL
const USE_MOCK_API = false; // Set to false when backend is available

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // token: localStorage.getItem("token") || "",
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication API functions
export const authAPI = {
  // Login user
  login: async (email, password) => {
    if (USE_MOCK_API) {
      return await mockAuthAPI.login(email, password);
    }
    try {
      const response = await api.post("auth/login", { email, password });
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      throw new Error("Login failed. Please try again.");
    }
  },

  // Register user
  register: async (email, name, password) => {
    try {
      const response = await api.post("/auth/register", {
        email,
        firstName: name.split(" ")[0] || name,
        lastName: name.split(" ")[1] || "",
        name : name,
        password,
      });
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      throw new Error("Registration failed. Please try again.");
    }
  },

  // Logout user
  logout: async () => {
    if (USE_MOCK_API) {
      return await mockAuthAPI.logout();
    }
    try {
      const response = await api.post("/auth/logout");
      return response.data;
    } catch (error) {
      // Fallback to mock if backend is not available
      console.warn("Backend not available, using mock API");
      return await mockAuthAPI.logout();
    }
  },

  // Get current user
  getCurrentUser: async () => {
    if (USE_MOCK_API) {
      return {
        success: true,
        data: JSON.parse(localStorage.getItem("user") || "{}"),
      };
    }
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      console.warn("Backend not available for user data");
      return {
        success: true,
        data: JSON.parse(localStorage.getItem("user") || "{}"),
      };
    }
  },
};
export const postsAPI = {
  fetchPosts: async () => {
    try {
      const response = await api.get("/posts/fetch-posts");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch posts. Please try again.");
    }
  },
  addPost: async ({ content, postType = "post", contentType = "text" }) => {
    try {
      const response = await api.post("/posts/create-post", {
        content,
        postType,
        contentType,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to add post. Please try again.");
    }
  },
  addComment: async (postId, content) => {
    try {
      const response = await api.post("/posts/add-comment/" + postId, {
        content,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to add comment. Please try again.");
    }
  },
  addReply: async (postId, commentId, content) => {
    try {
      const response = await api.post("/posts/add-reply", {
        postId,
        commentId,
        content,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to add reply. Please try again.");
    }
  },
  reactOnPostOrComment: async (targetId, type) => {
    try {
      const response = await api.post("/posts/react", { targetId, type });
      return response.data;
    } catch (error) {
      throw new Error("Failed to toggle like. Please try again.");
    }
  },
};
export default api;
