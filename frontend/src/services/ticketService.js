import api from './api';

export const getTickets = (params = {}) => api.get('/tickets', { params });

export const getTicket = (id) => api.get(`/tickets/${id}`);

export const createTicket = (payload) => api.post('/tickets', payload);

export const updateTicket = (id, payload) => api.put(`/tickets/${id}`, payload);

export const deleteTicket = (id) => api.delete(`/tickets/${id}`);
