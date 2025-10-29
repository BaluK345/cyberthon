import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // Django backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: refreshToken,
          });
          
          const newAccessToken = response.data.access;
          localStorage.setItem('access_token', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: async (userData: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post('/register/', userData);
    return response.data;
  },

  verifyOTP: async (otpData: {
    email: string;
    otp: string;
  }) => {
    const response = await api.post('/verify-otp/', otpData);
    return response.data;
  },

  login: async (credentials: {
    email: string;
    password: string;
  }) => {
    const response = await api.post('/login/', credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
  },
};

// File upload API calls
export const fileAPI = {
  uploadFiles: async (formData: FormData) => {
    const response = await api.post('/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// User API calls
export const userAPI = {
  getCurrentUser: async () => {
    const response = await api.get('/user/profile/');
    return response.data;
  },

  updateProfile: async (userData: any) => {
    const response = await api.put('/user/profile/', userData);
    return response.data;
  },
};

// Export the main api instance for custom calls
export default api;