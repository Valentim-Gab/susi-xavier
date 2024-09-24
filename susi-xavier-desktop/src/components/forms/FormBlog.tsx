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
import { useToast } from '@/hooks/use-toast'
import { BlogService } from '@/services/BlogService'
import ButtonMain from '../buttons/ButtonMain'
import TextEditor from '../inputs/TextEditor/TextEditor'

export const blogSchema = z.object({
  message: z.string().min(1, { message: 'A mensagem não pode ser vazia' }),
})

interface FormBlogProps {
  className?: string
  onRefresh: () => void
}

export default function FormBlog({ className, onRefresh }: FormBlogProps) {
  const blogService = new BlogService()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      message: '',
    },
  })

  async function onSubmit(values: z.infer<typeof blogSchema>) {
    const isSuccess = await blogService.create(values)

    console.log(values.message)

    if (isSuccess) {
      toast({
        title: 'Mensagem cadastrada',
        variant: 'positive',
      })
      onRefresh()
    } else {
      toast({
        title: 'Erro ao cadastrar mensagem',
        variant: 'destructive',
      })
    }

    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={twMerge('flex flex-col gap-4 bg-card w-full', className)}
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />
        <ButtonMain type="submit" className="w-fit px-4 py-2 self-end">
          <i className="icon-[solar--login-3-bold] w-[24px] h-[24px]"></i>
          Cadastrar
        </ButtonMain>
      </form>
    </Form>
  )
}
