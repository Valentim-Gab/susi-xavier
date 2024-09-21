import FormBlog from '@/components/forms/FormBlog'
import { BlogService } from '@/services/BlogService'
import { useQuery } from '@tanstack/react-query'

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
    <main className="flex-1 flex flex-col gap-4 p-4">
      <section className="section flex flex-col gap-8 p-8">
        <h1 className="text-xl">Cadastrar mensagem</h1>
        <FormBlog onRefresh={refetch} />
      </section>
      <section className="flex-auto section flex flex-col p-8 gap-8">
        <h1 className="text-xl">Mensagens</h1>
        {data && data.length > 0 && (
          <div className="flex flex-col gap-4">
            {data.map((blog_message: any, index: number) => (
              <article
                key={index}
                className="flex flex-col bg-background-secondary py-2 px-4 rounded-lg"
              >
                <p className="text-foreground-strong">{blog_message.message}</p>
                <p className="text-muted-foreground text-sm">12/12/1212</p>
              </article>
            ))}
          </div>
        )}
        {!data ||
          (data.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 py-16 px-4">
              <i className="icon-[solar--hashtag-chat-bold-duotone] w-[80px] h-[80px] text-primary"></i>
              <h3 className="text-center">Nenhuma mensagem cadastrada</h3>
            </div>
          ))}
      </section>
    </main>
  )
}
