import { Outlet } from 'react-router-dom'
import Header from '@/components/header/Header'

export default function PublicLayout() {
  return (
    <div id="public-layout" className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  )
}
