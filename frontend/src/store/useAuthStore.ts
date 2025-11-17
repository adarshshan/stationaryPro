
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  mobile: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      token: null,
      login: (user: User, token: string) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
