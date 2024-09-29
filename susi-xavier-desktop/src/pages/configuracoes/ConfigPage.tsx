import { useToast } from '@/hooks/use-toast'
import { UserService } from '@/services/UserService'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

export default function ConfigPage() {
  const userService = new UserService()
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [newAvatar, setNewAvatar] = useState<File | null>(null)
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['get_me'],
    queryFn: userService.getMe,
    retry: false,
  })

  const { data: avatar, isLoading: isLoadingAvatar } = useQuery({
    queryKey: ['download_avatar'],
    queryFn: userService.downloadAvatar,
  })

  if (isLoadingUser) {
    return <p>Carregando...</p>
  }

  if (!user) {
    return <p>Usuário não logado</p>
  }

  const configLinks = [
    {
      name: 'Perfil',
      icon: 'icon-[solar--user-circle-bold]',
      link: 'perfil',
    },
    {
      name: 'Credenciais',
      icon: 'icon-[solar--shield-bold]',
      link: 'credenciais',
    },
    {
      name: 'Conteúdo do Site',
      icon: 'icon-[solar--chat-square-code-bold]',
      link: 'website',
    },
    {
      name: 'Contatos',
      icon: 'icon-[solar--chat-square-bold]',
      link: 'contatos',
    },
    {
      name: 'Preferências',
      icon: 'icon-[solar--settings-minimalistic-bold]',
      link: 'preferencias',
    },
  ]

  const contacts = [
    {
      name: 'Instagram',
      icon: 'icon-[mdi--instagram]',
      href: 'https://www.instagram.com/mais.beleza.oficial/',
      classes: 'btn-instagram',
    },
    {
      name: 'Facebook',
      icon: 'icon-[mdi--facebook]',
      href: 'https://www.facebook.com/maisbeleza.susana',
      classes: 'btn-facebook',
    },
    {
      name: 'WhatsApp',
      icon: 'icon-[mdi--whatsapp]',
      href: 'https://wa.me/555592173898?text=Cuidando%20da%20sua%20beleza%20externa%20e%20interna',
      classes: 'btn-whatsapp',
    },
    {
      name: 'Email',
      icon: 'icon-[logos--google-gmail]',
      href: 'mailto:susixavieroficial@gmail.com',
      classes: 'btn-gmail gap-3',
    },
  ]

  const changeAvatar = () => {
    inputFileRef.current?.click()

    inputFileRef.current?.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement

      if (!target.files) {
        return
      }

      console.log(target.files?.item(0))
      const file = target.files.item(0)

      if (file) {
        setNewAvatar(file)
      }
    })
  }

  const cancelChangeAvatar = () => {
    setNewAvatar(null)
  }

  const acceptChangeAvatar = async () => {
    if (!newAvatar) {
      return
    }

    const isSuccess = await userService.uploadAvatar(newAvatar)

    if (isSuccess) {
      setNewAvatar(null)
      queryClient
        .resetQueries({ queryKey: ['download_avatar'] })
        .then(() => {
          toast({
            title: 'Avatar atualizado',
            variant: 'positive',
          })
        })
        .catch(() => {
          toast({
            title: 'Erro ao atualizar avatar',
            variant: 'destructive',
          })
        })
    } else {
      toast({
        title: 'Erro ao atualizar avatar',
        variant: 'destructive',
      })
    }
  }
  
  return (
    <main className="flex-auto flex flex-col gap-4 p-4 sm:flex-row">
      <section className="section p-8 flex flex-col gap-8 sm:w-fit">
        <div className="relative ">
          <div className="flex items-center justify-center rounded-full w-full aspect-square sm:min-w-[300px] sm:max-w-[500px] overflow-hidden">
            {avatar && !newAvatar && !isLoadingAvatar && (
              <img
                src={avatar}
                alt="Avatar"
                className="w-full h-full object-cover object-top"
              />
            )}
            {newAvatar && !isLoadingAvatar && (
              <img
                src={URL.createObjectURL(newAvatar)}
                alt="Avatar"
                className="w-full h-full object-cover object-top"
              />
            )}
            {!avatar && !newAvatar && !isLoadingAvatar && (
              <i className="icon-[solar--user-circle-bold] w-full h-full"></i>
            )}
            {isLoadingAvatar && <Loader2 className="h-20 w-20 animate-spin" />}
          </div>
          <span
            className="flex items-center justify-center p-2 bg-primary text-white rounded-full absolute right-[13%] bottom-[5%] cursor-pointer"
            onClick={changeAvatar}
          >
            <i className="icon-[solar--gallery-edit-bold] text-2xl"></i>
          </span>
          {newAvatar && (
            <span
              className="flex items-center justify-center p-2 bg-positive text-white rounded-full absolute right-[2%] bottom-[18%] cursor-pointer"
              onClick={acceptChangeAvatar}
            >
              <i className="icon-[f7--checkmark-alt] text-2xl"></i>
            </span>
          )}
          {newAvatar && (
            <span
              className="flex items-center justify-center p-2 bg-destructive text-white rounded-full absolute right-[28%] bottom-[-4%] cursor-pointer"
              onClick={cancelChangeAvatar}
            >
              <i className="icon-[f7--xmark] text-2xl"></i>
            </span>
          )}
          <input
            ref={inputFileRef}
            type="file"
            accept="image/png, image/jpeg, image/bmp, image/gif"
            className="hidden"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold truncate">
            {user.name} {user.last_name}
          </h1>
          <p className="text-muted-foreground truncate">{user.email}</p>
        </div>
        <div>
          <p>
            <strong>Celular: </strong>
            {user.phone_number ?? 'Não cadastrado'}
          </p>
          <p>
            <strong>Nascimento: </strong>
            {(user.date_birth as string) ?? 'Não cadastrada'}
          </p>
          <span className="flex items-center gap-1">
            <p>
              <strong>Email verificado:</strong>
            </p>
            {user.verified_email ? (
              <i className="icon-[solar--check-circle-bold] text-positive text-lg"></i>
            ) : (
              <i className="icon-[solar--close-circle-bold] text-destructive text-lg"></i>
            )}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <h6 className="text-sm col-span-full font-semibold">
            Redes Sociais do Site
          </h6>
          {contacts.map((button, index) => (
            <Link
              key={index}
              to={button.href}
              target="_blank"
              className={twMerge(
                'flex items-center justify-center gap-2 px-4 py-2 h-12 min-w-32 w-full rounded-lg font-medium shadow',
                button.classes
              )}
            >
              <i className={`${button.icon} w-6 h-6 text-white fill-white`}></i>
              {button.name}
            </Link>
          ))}
          {!contacts ||
            (contacts.length <= 0 && (
              <span className="p-4 col-span-full flex flex-wrap items-center justify-center text-center shadow rounded-lg gap-2">
                <i className="icon-[solar--notification-lines-remove-linear] bg-secondary text-2xl"></i>
                <p>Nenhum contato cadastrado</p>
              </span>
            ))}
        </div>
      </section>
      <section className="section">
        <div className="p-8">
          <h2 className="text-xl font-bold">Configurações</h2>
        </div>
        <div className="flex flex-col">
          {configLinks.map((link, index) => (
            <Link
              key={index}
              to={link.link}
              className="flex flex-row items-center gap-4 px-8 py-4 hover:bg-muted hover:text-foreground-strong transition duration-200 ease-in-out"
            >
              <i className={`${link.icon} text-2xl`}></i>
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
        {/* <div className="p-8">
          <ThemeButton className="scale-75 origin-top-left sm:scale-100 sm:origin-center" />
        </div> */}
      </section>
    </main>
  )
}
