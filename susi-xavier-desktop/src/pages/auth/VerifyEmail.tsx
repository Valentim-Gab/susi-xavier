import { AuthService } from '@/services/AuthService'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

const InfoCard = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  if (!token) {
    return (
      <>
        <span>
          <i className="icon-[solar--folder-error-bold-duotone] w-24 h-24 text-primary"></i>
        </span>
        <div className="flex flex-col text-center gap-2 mt-2">
          <h1 className="text-2xl font-bold">Token inválido</h1>
          <p>Tente reenviar a confirmação de email ou aguarde uns instantes.</p>
        </div>
      </>
    )
  }

  const authService = new AuthService()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['verifyEmail'],
    queryFn: () => authService.verifyEmail(token),
    retry: false,
  })

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col text-center gap-2 mt-12">
          <h1 className="text-2xl font-bold">Verficação de email</h1>
          <p>Email verificado com sucesso!</p>
        </div>
      </>
    )
  }

  if (isError || !data) {
    return (
      <>
        <span>
          <i className="icon-[solar--folder-error-bold-duotone] w-24 h-24 text-primary"></i>
        </span>
        <div className="flex flex-col text-center gap-2 mt-2">
          <h1 className="text-2xl font-bold">Erro ao verificar email</h1>
          <p>Tente reenviar a confirmação de email ou aguarde uns instantes.</p>
        </div>
      </>
    )
  }

  return (
    <>
      <span>
        <i className="icon-[solar--verified-check-bold-duotone] w-28 h-28 text-primary"></i>
      </span>
      <div className="flex flex-col text-center gap-2 mt-2">
        <h1 className="text-2xl font-bold">Verficação de email</h1>
        <p>Email verificado com sucesso!</p>
      </div>
    </>
  )
}

export default function VerifyEmail() {
  return (
    <main className="flex-auto flex items-center justify-center p-4">
      <section className="section max-w-[400px] h-[400px] p-4 sm:p-8">
        <div className="h-full flex flex-col items-center justify-center">
          <InfoCard />
        </div>
      </section>
    </main>
  )
}
