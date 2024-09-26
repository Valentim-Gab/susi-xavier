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
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ButtonMain from '@/components/buttons/ButtonMain'

export const formSchema = z
  .object({
    password: z.string().min(1, { message: 'Senha é obrigatória' }),
    passwordConfirmation: z
      .string()
      .min(1, { message: 'Confirmação de senha é obrigatória' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Senhas não conferem',
  })

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [submitted, setSubmitted] = useState(false)

  if (!token) {
    return (
      <main className="flex-auto flex items-center justify-center p-4">
        <section className="section flex flex-col justify-center items-center max-w-[400px] h-[400px] p-4 sm:p-8">
          <span>
            <i className="icon-[solar--folder-error-bold-duotone] w-24 h-24 text-primary"></i>
          </span>
          <div className="flex flex-col text-center gap-2 mt-2">
            <h1 className="text-2xl font-bold">Alteração de senha</h1>
            <p>
              Token inválido. Tente reenviar a solicitação de alteração de senha
              ou aguarde uns instantes.
            </p>
          </div>
        </section>
      </main>
    )
  }

  const authService = new AuthService()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values || !token) {
      return
    }

    const resp = await authService.resetPassword(
      values.password,
      values.passwordConfirmation,
      token
    )

    if (resp.success) {
      setSubmitted(true)
      toast({
        title: resp.message,
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
    <main className="flex-auto flex flex-col items-center justify-center p-4">
      <section
        data-show={!submitted}
        className="section flex flex-col justify-between opacity-0 data-[show=true]:opacity-100 data-[show=true]:p-4 absolute data-[show=true]:relative scale-0 data-[show=true]:scale-100 max-w-[400px] data-[show=true]:min-h-[320px] data-[show=true]:sm:p-8 transition-all duration-1000 ease-in-out"
      >
        {!submitted && (
          <>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Alteração de senha</h1>
              <p>Cadastre uma nova senha para sua conta</p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 bg-card w-full mt-8"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputMain.Root>
                          <InputMain.Input
                            {...field}
                            type="password"
                            autoComplete="new-password"
                            styleLabel="primary"
                          />
                          <InputMain.Label
                            value={field.value}
                            styleLabel="primary"
                          >
                            Senha
                          </InputMain.Label>
                        </InputMain.Root>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputMain.Root>
                          <InputMain.Input
                            {...field}
                            type="password"
                            autoComplete="new-password"
                            styleLabel="primary"
                          />
                          <InputMain.Label
                            value={field.value}
                            styleLabel="primary"
                          >
                            Confirmação de senha
                          </InputMain.Label>
                        </InputMain.Root>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center flex-col gap-4 mt-3">
                  <ButtonMain type="submit" className="w-full">
                    <i className="icon-[solar--send-square-bold] w-[24px] h-[24px]"></i>
                    Enviar
                  </ButtonMain>
                </div>
              </form>
            </Form>
          </>
        )}
      </section>

      <section
        data-show={submitted}
        className="section flex flex-col justify-center items-center transition-all duration-300 ease-in-out data-[show=true]:max-w-[400px] data-[show=true]:h-[400px] data-[show=true]:p-4 scale-0 data-[show=true]:scale-100 data-[show=true]:sm:p-8"
      >
        {submitted && (
          <>
            <span>
              <i className="icon-[solar--verified-check-bold-duotone] w-24 h-24 text-primary"></i>
            </span>
            <div className="flex flex-col text-center gap-2 mt-2">
              <h1 className="text-2xl font-bold">Senha redefinida!</h1>
              <p>Sua senha foi alterada com sucesso</p>
              <p>Faça login com sua nova senha.</p>
            </div>
          </>
        )}
      </section>
    </main>
  )
}
