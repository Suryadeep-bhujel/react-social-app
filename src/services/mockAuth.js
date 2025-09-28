// Mock authentication service for testing
export const mockAuthAPI = {
  // Mock login - always succeeds for demo
  login: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: "Login successful",
      data: {
        user: {
          _id: "mock_user_id",
          firstName: "John",
          lastName: "Doe",
          email: email,
          lastLogin: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isLocked: false,
          id: "mock_user_id"
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im1vY2tfdXNlcl9pZCIsImlhdCI6MTc1OTAzNDcwMiwiZXhwIjoxNzYxNjI2NzAyfQ.mock_token_signature"
      }
    };
  },

  // Mock register - always succeeds for demo
  register: async (email, name, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: "Registration successful",
      data: {
        user: {
          _id: "mock_user_id",
          firstName: name.split(' ')[0] || name,
          lastName: name.split(' ')[1] || '',
          email: email,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isLocked: false,
          id: "mock_user_id"
        }
      }
    };
  },

  // Mock logout
  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      message: "Logout successful"
    };
  }
};