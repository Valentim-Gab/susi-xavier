import { getTokens } from '@/helpers/StorageHelper'
import Login from '@/pages/auth/login/Login'
import { AuthService } from '@/services/AuthService'
import { useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'

export function LoginRoute() {
  const tokens = getTokens()

  if (tokens) {
    const authService = new AuthService()

    const { data, isLoading, isError } = useQuery({
      queryKey: ['checkAuth'],
      queryFn: authService.checkAuth,
      retry: false,
    })

    if (isLoading) {
      return
    }

    if (isError || !data) {
      authService.signOut()

      return <Login />
    }

    return <Navigate to="/dashboard" />
  }

  return <Login />
}
