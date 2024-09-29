import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSidebar } from '../providers/SidebarProvider'
import './Sidebar.scss'
import { AuthService } from '@/services/AuthService'
import { getUser } from '@/helpers/StorageHelper'
import { UserService } from '@/services/UserService'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export default function Sidebar() {
  const sidebarContext = useSidebar()
  const location = useLocation()
  const navigate = useNavigate()
  const user = getUser()
  const [avatar, setAvatar] = useState<string | null>(null)
  const userService = new UserService()

  const { data, isLoading } = useQuery({
    queryKey: ['download_avatar'],
    queryFn: userService.getAvatar,
    retry: false,
  })

  useEffect(() => {
    if (data) {
      setAvatar(data)
    }
  }, [data])

  if (isLoading) {
    return
  }

  if (!user) {
    return
  }

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
            <div className="w-[60px] aspect-square rounded-full overflow-hidden">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="object-cover object-top"
                />
              ) : (
                <i className="icon-[solar--user-circle-bold] text-6xl"></i>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {user?.name ?? 'Não reconhecido'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {user?.email ?? ''}
              </p>
            </div>
          </div>
          <div className="flex-auto mt-8 text-base flex flex-col gap-4">
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
              className="relative flex flex-row items-center gap-4 p-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition duration-200 ease-in-out mt-auto"
            >
              <i className="icon-[solar--logout-3-bold] text-2xl"></i>
              <span className="text-lg font-medium">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
