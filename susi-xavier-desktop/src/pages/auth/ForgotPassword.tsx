import { AuthService } from '../../services/AuthService'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { InputMain } from '@/components/inputs/InputMain/Index'
import ButtonMain from '@/components/buttons/ButtonMain'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const formSchema = z.object({
  username: z
    .string()
    .email({ message: 'Email é inválido' })
    .min(1, { message: 'Email é obrigatório' }),
})

export default function ForgotPassword() {
  const authService = new AuthService()
  const router = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.username) {
      return
    }

    setLoading(true)

    const resp = await authService.sendRecoverEmail(values.username)

    setLoading(false)

    if (resp.success) {
      router('/')
      toast({
        title: 'Email enviado com sucesso!',
        description: resp.message,
        variant: 'positive',
      })
    } else {
      toast({
        title: resp.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <main className="flex-auto flex items-center justify-center p-4">
      <section className="section flex flex-col justify-between max-w-[400px] min-h-[320px] p-4 sm:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Esqueci minha senha</h1>
          <p>Informe o email da conta para redefinir a senha.</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 bg-card w-full mt-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <InputMain.Root>
                      <InputMain.Input
                        {...field}
                        type="email"
                        autoComplete="email"
                        styleLabel="primary"
                      />
                      <InputMain.Label value={field.value} styleLabel="primary">
                        Email
                      </InputMain.Label>
                    </InputMain.Root>
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
            <div className="flex items-center flex-col gap-4 mt-3">
              <ButtonMain
                type="submit"
                className="w-full"
                disabled={loading}
                loading={loading}
              >
                <i className="icon-[solar--send-square-bold] w-[24px] h-[24px]"></i>
                Enviar
              </ButtonMain>
              <ButtonMain
                variant="outline"
                type="button"
                className="w-full h-14"
                onClick={() => router('/')}
              >
                <i className="icon-[solar--rewind-back-circle-bold] w-[24px] h-[24px]"></i>
                Voltar
              </ButtonMain>
            </div>
          </form>
        </Form>
      </section>
    </main>
  )
}
