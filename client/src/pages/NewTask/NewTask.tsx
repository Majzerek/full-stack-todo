import {  Wrapper } from '@/components'
import { TodoForm } from './components/TodoForm'



export const NewTask = () => {
  return (
    <Wrapper >
      <h1 className='text-4xl my-7 text-center'>Here you can add new task.</h1>
      <TodoForm />
    </Wrapper>
  )
}
