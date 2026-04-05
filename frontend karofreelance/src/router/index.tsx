import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginPage }        from '../pages/auth/LoginPage'
import { RegisterPage }     from '../pages/auth/RegisterPage'
import { AdminDashboard }   from '../pages/admin/AdminDashboard'
import { StudentDashboard } from '../pages/student/StudentDashboard'
import { ClientDashboard }  from '../pages/client/ClientDashboard'
import { PrivateRoute }     from './PrivateRoute'

const router = createBrowserRouter([
  { path: '/login',    element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    element: <PrivateRoute allowedRoles={['ADMIN']} />,
    children: [{ path: '/admin/dashboard', element: <AdminDashboard /> }],
  },
  {
    element: <PrivateRoute allowedRoles={['STUDENT']} />,
    children: [{ path: '/student/dashboard', element: <StudentDashboard /> }],
  },
  {
    element: <PrivateRoute allowedRoles={['CLIENT']} />,
    children: [{ path: '/client/dashboard', element: <ClientDashboard /> }],
  },
])

export const AppRouter = () => <RouterProvider router={router} />