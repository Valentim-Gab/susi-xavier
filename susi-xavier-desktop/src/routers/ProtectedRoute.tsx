import { AuthService } from '@/services/AuthService'
import { useQuery } from '@tanstack/react-query'
import { Navigate, useLocation } from 'react-router-dom'

export function ProtectedRoute({ component: Component, ...rest }: any) {
  const authService = new AuthService()
  const location = useLocation()

  const { data, error, isLoading } = useQuery({
    queryKey: ['checkAuth', location.pathname],
    queryFn: authService.checkAuth,
    retry: false,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error || !data) {
    return <Navigate to="/" />
  }

  return <Component {...rest} />
}
