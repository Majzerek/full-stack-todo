import { TodoForm } from "@/components"


export const Dashboard = () => {
  return (
    <div className='w-screen h-full  relative'>
      <main className="flex flex-col items-center justify-center w-full">
        <section className='mt-15'>
          <h1 className="text-center text-4xl my-5">Add Task</h1>
          <TodoForm />
        </section>
      </main>
    </div>
  )
}
