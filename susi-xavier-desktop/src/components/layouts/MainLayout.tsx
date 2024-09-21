import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/sidebar/Sidebar'
import Header from '../header/Header'

export default function MainLayout() {
  return (
    <div id="main-layout" className="flex flex-col min-h-screen">
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  )
}
