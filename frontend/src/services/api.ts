import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service for transcript operations
export const transcriptService = {
  async generateSummary(transcript: string) {
    try {
      const response = await api.post('/transcript', { transcript });
      return response.data;
    } catch (error) {
      console.error('Error generating summary:', error);
      throw error;
    }
  },
};

// API service for email operations
export const emailService = {
  async sendSummaryEmail(to: string[], subject: string, summary: string, transcript?: string) {
    try {
      const response = await api.post('/email/send', {
        to,
        subject,
        summary,
        transcript
      });
      return response.data;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },
};

export default api;
