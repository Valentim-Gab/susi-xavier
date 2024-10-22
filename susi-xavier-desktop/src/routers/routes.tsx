import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import MainLayout from '@/components/layouts/MainLayout'
import Blog from '@/pages/blog/Blog'
import ConfigPage from '@/pages/configuracoes/ConfigPage'
import Dashboard from '@/pages/dashboard/Dashboard'
import Login from '@/pages/login/Login'
import Profile from '@/pages/perfil/Profile'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<ProtectedRoute component={Dashboard} />} />
          <Route path="blog" element={<ProtectedRoute component={Blog} />} />
          <Route
            path="perfil"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route
            path="configuracoes"
            element={<ProtectedRoute component={ConfigPage} />}
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
