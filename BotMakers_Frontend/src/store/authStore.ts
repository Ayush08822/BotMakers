import { create } from 'zustand'
import type { User } from '../types'

const TOKEN_KEY = 'jwt_token'
const USER_KEY  = 'jwt_user'

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  setAuth: (token: string, user: User) => void
  logout: () => void
}

const storedToken = localStorage.getItem(TOKEN_KEY)
const storedUser  = (() => {
  try { return JSON.parse(localStorage.getItem(USER_KEY) ?? 'null') } catch { return null }
})()

export const useAuthStore = create<AuthState>((set) => ({
  token:           storedToken,
  user:            storedUser,
  isAuthenticated: !!storedToken,

  setAuth: (token, user) => {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    set({ token, user, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    set({ token: null, user: null, isAuthenticated: false })
  },
}))

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY)