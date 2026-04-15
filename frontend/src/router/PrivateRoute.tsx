import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store'

interface Props { allowedRoles: string[] }

export const PrivateRoute = ({ allowedRoles }: Props) => {
  const { isAuth, role } = useAuthStore()
  if (!isAuth) return <Navigate to="/login" replace />
  if (!allowedRoles.includes(role!)) return <Navigate to="/unauthorized" replace />
  return <Outlet />
}