import axios from 'axios';
import { LoginForm, RegisterForm, AuthResponse } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://proyeckev.uc.r.appspot.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(data: { username: string; password: string }) {
    const response = await api.post('/api/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async register(data: { username: string; password: string; confirm_password?: string }) {
    const { confirm_password, ...registerData } = data;
    const response = await api.post('/api/register', registerData);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  report: async (problem: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/report', { problem });
    return response.data;
  },
};

export const postsService = {
  async getPosts() {
    const response = await api.get('/api/posts');
    return response.data;
  },

  async createPost(data: { content: string; image_url?: string; user_id: number }) {
    const response = await api.post('/api/posts', data);
    return response.data;
  },

  async likePost(postId: number) {
    const response = await api.post(`/api/posts/${postId}/like`);
    return response.data;
  },

  async commentPost(postId: number, comment: string) {
    const response = await api.post(`/api/posts/${postId}/comment`, { comment });
    return response.data;
  }
}; 