import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { LoginRoute } from './LoginRoute'
import Blog from '@/pages/blog/Blog'
import ConfigPage from '@/pages/configuracoes/ConfigPage'
import Dashboard from '@/pages/dashboard/Dashboard'
import VerifyEmail from '@/pages/auth/VerifyEmail'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import ResetPassword from '@/pages/auth/ResetPassword'
import MainLayout from '@/layouts/MainLayout'
import PublicLayout from '@/layouts/PublicLayout'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRoute />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute component={MainLayout} />}
        >
          <Route index element={<Dashboard />} />
          <Route path="blog" element={<Blog />} />
          <Route path="configuracoes" element={<ConfigPage />} />
        </Route>
        <Route path="/public" element={<PublicLayout />}>
          <Route path="email-confirmation" element={<VerifyEmail />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
