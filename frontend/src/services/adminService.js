import api from './api';

export const getAnalytics = () => api.get('/admin/analytics');

export const getUsers = (params = {}) => api.get('/admin/users', { params });

export const updateUserRole = (userId, role) => api.put(`/admin/users/${userId}/role`, { role });

export const getSupportAgents = () => api.get('/admin/agents');
