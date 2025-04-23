// src/stores/authStore.ts
import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  setAuthenticated: (val: boolean) => void
  setToken: (token: string | null) => void
  checkAuth: () => Promise<void>
  logout: () => void
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: localStorage.getItem('access_token'),
  setAuthenticated: (val) => set({ isAuthenticated: val }),
  setToken: (token) => {
    token
      ? localStorage.setItem('access_token', token)
      : localStorage.removeItem('access_token')
    set({ token })
  },

  checkAuth: async () => {
    const token = localStorage.getItem('access_token')

    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/check`, {
      method: 'GET',
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {},
      credentials: 'include', // allow cookies if they exist
    })

    set({ isAuthenticated: res.ok })
  },

  logout: () => {
    localStorage.removeItem('access_token')
    set({ token: null, isAuthenticated: false })
  }
}))

