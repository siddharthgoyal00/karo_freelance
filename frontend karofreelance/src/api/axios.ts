import axios from 'axios'
import { useAuthStore } from '../store/auth.store'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auto-refresh on 401
let isRefreshing = false
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      if (!isRefreshing) {
        isRefreshing = true
        try {
          const refreshToken = useAuthStore.getState().refreshToken
          const { data } = await axios.post('/api/v1/auth/refresh', null, {
            baseURL: import.meta.env.VITE_API_URL,
            headers: { 'X-Refresh-Token': refreshToken },
          })
          useAuthStore.getState().setTokens(
            data.data.accessToken,
            data.data.refreshToken
          )
        } catch {
          useAuthStore.getState().logout()
          window.location.href = '/login'
        } finally {
          isRefreshing = false
        }
      }
      return api(original)
    }
    return Promise.reject(error)
  }
)

export default api