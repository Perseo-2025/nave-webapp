'use client';

import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, logout } = useAuthStore();
  const router = useRouter();

  const login = async (username: string, password: string) => {
    const data = await authService.login({ username, password });

    document.cookie = `access_token=${data.accessToken}; path=/; max-age=${8 * 60 * 60}`;

    setAuth(data.user, data.accessToken);
    router.push('/admin');
  };

  const handleLogout = () => {
    document.cookie =
      'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    logout();
    router.push('/login');
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout: handleLogout,
  };
}