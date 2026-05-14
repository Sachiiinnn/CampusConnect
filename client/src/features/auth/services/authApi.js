import { apiClient } from '../../../lib/apiClient';

export const authApi = {
  // User Routes
  userLogin: async (credentials) => {
    const response = await apiClient.post('/users/login', credentials);
    return response.data;
  },
  userRegister: async (userData) => {
    const response = await apiClient.post('/users/register', userData);
    return response.data;
  },
  
  // Admin Routes
  adminLogin: async (credentials) => {
    const response = await apiClient.post('/admin/login', credentials);
    return response.data;
  },
  createAdmin: async (adminData) => {
    const response = await apiClient.post('/admin/create-admin', adminData);
    return response.data;
  },
  getAdminDashboard: async () => {
    const response = await apiClient.get('/admin/dashboard');
    return response.data;
  }
};
