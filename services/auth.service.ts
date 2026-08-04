import api from './api';
import { ApiResponse, AuthResponse } from '@/types';

interface LoginCredentials {
  username: string;
  password: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials,
    );
    return response.data.data;
  },

  getProfile: async (): Promise<AuthResponse['user']> => {
    const response = await api.get<ApiResponse<AuthResponse['user']>>(
      '/auth/profile',
    );
    return response.data.data;
  },
};