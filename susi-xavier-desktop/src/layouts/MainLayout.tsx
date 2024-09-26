import { Outlet } from 'react-router-dom'
import { getUser } from '@/helpers/StorageHelper'
import Sidebar from '@/components/sidebar/Sidebar'
import Header from '@/components/header/Header'
import Alert from '@/components/alerts/Alert'
import AlertDialog from '@/components/alerts/AlertDialog'
import { AuthService } from '@/services/AuthService'
import { useToast } from '@/hooks/use-toast'

export default function MainLayout() {
  let alert = null
  const user = getUser()

  if (user && !user.verified_email) {
    const auth = new AuthService()
    const { toast } = useToast()

    const sendEmail = async () => {
      const isSuccess = await auth.sendVerifyEmail()

      if (isSuccess) {
        toast({
          title: 'Email enviado!',
          variant: 'positive',
        })
      } else {
        toast({
          title: 'Erro ao enviar email!',
          variant: 'destructive',
        })
      }
    }

    alert = (
      <div className="flex gap-2">
        <p>O seu email ainda não foi verificado.</p>
        <AlertDialog
          title="Aviso!"
          description='Um email de confirmação será enviado para: "aaaahh"'
          textButtonOpen="Clique aqui!"
          textButtonAction="Confirmar"
          textButtonCancel="Cancelar"
          action={sendEmail}
        />
      </div>
    )
  }

  return (
    <div id="main-layout" className="flex flex-col min-h-screen">
      <Header showSidebar />
      {alert && <Alert>{alert}</Alert>}
      <Sidebar />
      <Outlet />
    </div>
  )
}
