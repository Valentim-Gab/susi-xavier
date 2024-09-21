import { useNavigate, useSearchParams } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { useEffect } from 'react'
import './Login.scss'
import FormLogin from '@/components/forms/FormLogin'

export default function Login() {
  const { toast } = useToast()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const expired = searchParams.get('expired')

    if (expired) {
      setTimeout(() => {
        toast({
          title: 'Sessão expirada',
          description: 'Sua sessão expirou, faça login novamente.',
          variant: 'destructive',
        })

        navigate('/', { replace: true })
      }, 100)
    }
  }, [toast, searchParams])

  return (
    <main className="grid grid-cols-12 bg-card">
      <section className="col-span-7">
        <video className="background-video" autoPlay loop muted>
          <source type="video/mp4" src="videos/tarot.mp4" />
        </video>
      </section>
      <section className="col-span-5 place-self-center flex flex-col gap-8 items-center justify-center p-8 max-w-[400px]">
        <img src="/logos/logo.png" alt="Logo" />
        <FormLogin />
      </section>
    </main>
  )
}
