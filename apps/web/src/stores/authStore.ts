import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserRole = 'merchant' | 'partner' | 'admin' | 'data' | 'management';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  merchantId?: string;
  partnerId?: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  role: UserRole | null;

  setAuth: (user: AuthUser, accessToken: string) => void;
  setAccessToken: (accessToken: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      role: null,

      setAuth: (user, accessToken) =>
        set({ user, accessToken, role: user.role }),

      setAccessToken: (accessToken) =>
        set({ accessToken }),

      clearAuth: () =>
        set({ user: null, accessToken: null, role: null }),

      isAuthenticated: () => Boolean(get().accessToken && get().user),
    }),
    {
      name: 'omm-auth',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        role: state.role,
      }),
    }
  )
);
