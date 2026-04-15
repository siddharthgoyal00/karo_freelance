import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Role = 'ADMIN' | 'STUDENT' | 'CLIENT' | null

interface AuthState {
  accessToken:  string | null
  refreshToken: string | null
  role:         Role
  fullName:     string | null
  userId:       string | null
  isAuth:       boolean

  setAuth:    (payload: Omit<AuthState, 'isAuth' | 'setAuth' | 'setTokens' | 'logout'>) => void
  setTokens:  (access: string, refresh: string) => void
  logout:     () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken:  null,
      refreshToken: null,
      role:         null,
      fullName:     null,
      userId:       null,
      isAuth:       false,

      setAuth: (payload) => set({ ...payload, isAuth: true }),
      setTokens: (access, refresh) =>
        set({ accessToken: access, refreshToken: refresh }),
      logout: () =>
        set({ accessToken: null, refreshToken: null,
              role: null, fullName: null, userId: null, isAuth: false }),
    }),
    { name: 'karo-auth', partialize: (s) => ({
        accessToken: s.accessToken, refreshToken: s.refreshToken,
        role: s.role, fullName: s.fullName, userId: s.userId, isAuth: s.isAuth
      })
    }
  )
)