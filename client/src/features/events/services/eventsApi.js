import { apiClient } from '../../../lib/apiClient';

export const eventsApi = {
  getAll: async () => {
    const response = await apiClient.get('/events');
    return response.data;
  },
  getById: async (id) => {
    const response = await apiClient.get(`/events/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await apiClient.post('/events', { event: data });
    return response.data;
  },
  update: async (id, data) => {
    const response = await apiClient.put(`/events/${id}`, { event: data });
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`/events/${id}`);
    return response.data;
  },
  addFaq: async (eventId, question) => {
    const response = await apiClient.post(`/events/${eventId}/faqs`, { question });
    return response.data;
  },
  // Added Delete FAQ route
  deleteFaq: async (eventId, faqId) => {
    const response = await apiClient.delete(`/events/${eventId}/faqs/${faqId}`);
    return response.data;
  }
};
