import { Wrapper } from "@/components";
import { TodoForm } from "./components/TodoForm";

export const NewTask = () => {
  return (
    <Wrapper>
      <title>App Todo New-Task</title>
      <h1 className="text-4xl my-7 text-center">Here you can add new task.</h1>
      <TodoForm />
    </Wrapper>
  );
};
