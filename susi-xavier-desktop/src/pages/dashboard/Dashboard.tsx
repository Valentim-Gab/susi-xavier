import { useQuery } from '@tanstack/react-query'
import { BlogService } from '@/services/BlogService'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const blogService = new BlogService()
  const { data, error, isLoading } = useQuery({
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
    <main className="flex-auto grid grid-cols-2 p-4 gap-4">
      <section className="section flex flex-col gap-4 p-8">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-sm">Bem vindo ao painel de controle</p>
      </section>

      <section className="section flex flex-col items-center justify-center gap-4 py-16 px-4">
        <i className="icon-[solar--pie-chart-2-bold-duotone] w-[80px] h-[80px] text-primary"></i>
        <h3 className="text-center">Estatísticas indisponíveis</h3>
      </section>
      <section className="section flex flex-col items-center p-8">
        <div className='flex-auto w-full flex flex-col gap-4 mb-4 max-h-[300px] overflow-y-auto'>
          {data &&
            data.length > 0 &&
            data.map((blog_message: any, index: number) => (
              <article
                key={index}
                className="flex flex-col bg-background-secondary py-2 px-4 rounded-lg"
              >
                <p className="text-foreground-strong">{blog_message.message}</p>
                <p className="text-muted-foreground text-sm">12/12/1212</p>
              </article>
            ))}
        </div>
        {!data ||
          (data.length === 0 && (
            <div className="flex-auto flex flex-col items-center justify-center mb-8 gap-4">
              <i className="icon-[solar--hashtag-chat-bold-duotone] w-[80px] h-[80px] text-primary"></i>
              <h3 className="text-center">Você ainda não publicou nada</h3>
            </div>
          ))}
        <Link to="blog" className="bg-secondary text-white py-2 px-4 rounded-lg font-bold">Acessar blog</Link>
      </section>
      <section className="section flex flex-col items-center justify-center gap-4 py-16 px-4">
        <i className="icon-[solar--chat-line-bold-duotone] w-[80px] h-[80px] text-primary"></i>
        <h3 className="text-center">Mensagens indisponíveis</h3>
      </section>
    </main>
  )
}
