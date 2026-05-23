import api from './api';

export const getComments = (ticketId, params = {}) =>
  api.get(`/tickets/${ticketId}/comments`, { params });

export const addComment = (ticketId, payload) =>
  api.post(`/tickets/${ticketId}/comments`, payload);
