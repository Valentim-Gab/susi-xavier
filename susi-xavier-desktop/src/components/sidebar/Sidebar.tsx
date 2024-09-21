import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSidebar } from '../providers/SidebarProvider'
import './Sidebar.scss'
import { AuthService } from '@/services/AuthService'

export default function Sidebar() {
  const sidebarContext = useSidebar()
  const location = useLocation()
  const navigate = useNavigate()

  if (!sidebarContext) {
    return null
  }

  const { state, dispatch } = sidebarContext

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
  }

  const sidebarItems = [
    {
      icon: 'icon-[solar--home-2-bold]',
      name: 'Início',
      link: '/dashboard',
    },
    {
      icon: 'icon-[solar--chat-square-like-bold]',
      name: 'Blog',
      link: '/dashboard/blog',
    },
    {
      icon: 'icon-[solar--user-circle-bold]',
      name: 'Perfil',
      link: '/dashboard/perfil',
    },
    {
      icon: 'icon-[solar--settings-bold]',
      name: 'Configurações',
      link: '/dashboard/configuracoes',
    },
  ]

  const logout = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
    const authService = new AuthService()

    const isSuccess = authService.signOut()

    if (isSuccess) {
      navigate('/')
    } else {
      console.log('Error')
    }
  }

  return (
    <aside className="absolute drawer">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle overflow-y-hidden"
        checked={state.isOpen}
        readOnly
      />
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={toggleSidebar}
        ></label>
        <div className="menu min-h-full w-80 p-8 bg-card">
          <button
            className="flex flex-col items-center absolute right-0 top-0 p-2"
            onClick={toggleSidebar}
          >
            <i className="icon-[f7--xmark]"></i>
          </button>
          <div className="flex flex-row gap-4">
            <img src="/imgs/susi.png" alt="Logo" className="w-[60px]" />
            <div>
              <h2 className="text-xl font-bold">Administrador</h2>
              <p className="text-sm text-muted-foreground">adm@email.vale</p>
            </div>
          </div>
          <div className="mt-8 text-base flex flex-col gap-4">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                data-active={location.pathname === item.link}
                onClick={toggleSidebar}
                className="relative flex flex-row items-center gap-4 p-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition duration-200 ease-in-ou data-[active=true]:text-primary data-[active=true]:hover:text-primary-foreground"
              >
                <i className={`${item.icon} text-2xl`}></i>
                <span>{item.name}</span>
              </Link>
            ))}
            <button
              onClick={logout}
              className="relative flex flex-row items-center gap-4 p-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition duration-200 ease-in-out"
            >
              <i className="icon-[solar--logout-3-bold] text-2xl"></i>
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
