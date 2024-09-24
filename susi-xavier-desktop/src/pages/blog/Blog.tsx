import { Message } from '@/interfaces/Blog'
import { BlogService } from '@/services/BlogService'
import { useQuery } from '@tanstack/react-query'
import FormBlog from '@/components/forms/FormBlog'
import InnerHtmlContainer from '@/components/InnerHtmlContainer/InnerHtmlContainer'

export default function Blog() {
  const blogService = new BlogService()
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['blog'],
    queryFn: blogService.getAll,
  })

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (error || !data) {
    return <p>Falha</p>
  }

  return (
    <main className="flex-1 flex flex-col p-4">
      <section className="section flex flex-col gap-8 p-8">
        <h1 className="text-xl">Cadastrar mensagem</h1>
        <FormBlog onRefresh={refetch} />
      </section>
      <h1 className="text-foreground-strong font-bold mt-4">Mensagens</h1>
      {data && data.length > 0 && (
        <section className="flex-auto flex flex-col gap-4 mt-4">
          {data.map((blog_message: Message, index: number) => (
            <div
              key={index}
              className="flex flex-col bg-card shadow p-4 rounded-lg"
            >
              <InnerHtmlContainer html={blog_message.message} />
              <p className="text-muted-foreground text-sm mt-4 place-self-end">12/12/1212</p>
            </div>
          ))}
        </section>
      )}

      {!data ||
        (data.length === 0 && (
          <section className="section flex flex-col items-center justify-center gap-4 py-16 px-4 mt-4">
            <i className="icon-[solar--hashtag-chat-bold-duotone] w-[80px] h-[80px] text-primary"></i>
            <h3 className="text-center">Nenhuma mensagem cadastrada</h3>
          </section>
        ))}
    </main>
  )
}
