import { useQuery } from '@tanstack/react-query'
import './App.scss'
import { Button } from './components/ui/button'
import { BlogService } from './services/BlogService'

export default function Example() {
  const blogService = new BlogService()
  const { data, error, isLoading } = useQuery({
    queryKey: ['blog'],
    queryFn: blogService.getAll,
  })

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (error) {
    return <p>Erro: {error.message}</p>
  }

  return (
    <main className="container">
      <section className="flex flex-col gap-4 p-4">
        <p>AAAAAAAAAAAAAAAAAAAA</p>
        <h1 className="text-secondary text-4xl">Welcome to Tauri!</h1>
        <p className="text-secondary text-4xl font-black">Welcome to Tauri!</p>
        <i className="icon-[solar--accumulator-bold] w-[50px] h-[50px] text-primary"></i>

        {data.map((blog_message: any, index: number) => (
          <article key={index} className="card">
            <p className="card-foreground">#: {index + 1}</p>
            <p className="card-foreground">
              Mensagem: {blog_message.message}
            </p>
          </article>
        ))}

        <Button className="bg-primary">Click me</Button>
      </section>
    </main>
  )
}
