import { TodoForm } from "@/components"


export const Dashboard = () => {
  return (
    <div className='w-screen h-full  relative'>
      <header><h1>TodoApp</h1></header>
      <main className=''>
        <section className='flex flex-col items-center justify-center w-full'>
          <TodoForm />
        </section>
      </main>
    </div>
  )
}
