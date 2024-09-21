import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { twMerge } from 'tailwind-merge'
import { Link, useNavigate } from 'react-router-dom'
import { InputMain } from '@/components/inputs/InputMain/Index'
import { useToast } from '@/hooks/use-toast'
import { AuthService } from '@/services/AuthService'
import ButtonMain from '../buttons/ButtonMain'

export const formSchema = z.object({
  username: z
    .string()
    .email({ message: 'Email é inválido' })
    .min(1, { message: 'Email é obrigatório' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
})

interface FormLoginProps {
  className?: string
}

export default function FormLogin({ className }: FormLoginProps) {
  const authService = new AuthService()
  const router = useNavigate()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const isSuccess = await authService.signIn(values)

    if (isSuccess) {
      router('/dashboard')
      toast({
        title: 'Login efetuado com sucesso',
        description: 'Seja bem-vindo!',
        variant: 'positive',
      })
    } else {
      toast({
        title: 'Erro ao efetuar login',
        description: 'Verifique suas credenciais e tente novamente',
        variant: 'destructive',
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={twMerge('flex flex-col gap-4 bg-card w-full', className)}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
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
              <FormMessage />
            </FormItem>
          )}
        />
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
                    autoComplete="current-password"
                    styleLabel="primary"
                  />
                  <InputMain.Label value={field.value} styleLabel="primary">
                    Senha
                  </InputMain.Label>
                </InputMain.Root>
              </FormControl>
              <FormMessage />
              <div className="flex flex-col items-end w-full">
                <Link
                  to="#"
                  className="text-xs font-light underline lg:text-sm"
                >
                  Esqueci minha senha
                </Link>
              </div>
            </FormItem>
          )}
        />
        <div className="flex items-center flex-col gap-4">
          <ButtonMain type="submit" className="w-full">
            <i className="icon-[solar--login-3-bold] w-[24px] h-[24px]"></i>
            Entrar
          </ButtonMain>
        </div>
      </form>
    </Form>
  )
}
