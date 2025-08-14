import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button, Card, CardContent, CardDescription, CardFooter, CardTitle, Loader } from "@/components";
import { useAlertContext } from "@/context";
import { useUserTasks } from "@/hooks/useUserTasks";
import type { TodosType } from "@/types";
import axios from "axios";
import { format } from "date-fns";
import { useState } from "react";



export const TasksList = () => {

  const { userTasks, setRefetch } = useUserTasks();
  const [loading, setLoading] = useState(false);
  const { showErrorAlert, showSuccessAlert } = useAlertContext()

  const completTask = async (task: TodosType) => {
    setLoading(true)

    await axios.post('http://localhost:4040/task/completed', task)
      .then(() => {
        showSuccessAlert('Update Completed!');
        setLoading(false);
        setRefetch(true);
      })
      .catch((err) => {
        showErrorAlert(err.response.data.message);
        setLoading(false);
      })
  };
  const deleteTask = async (id: string) => {
    setLoading(true)

    await axios.delete(`http://localhost:4040/task/delete/${id}`)
      .then((res) => {
        showSuccessAlert(res.data.message);
        setLoading(false);
        setRefetch(true);
      })
      .catch((err) => {
        showErrorAlert(err.response.data.message);
        setLoading(false);
      })
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    )
  };

  return (
    <div className="w-full flex flex-wrap justify-center">
      <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 gap-4 p-5">

        {userTasks.map((task) => (
          <Card key={task.id} className="p-2 w-80 h-fit">
            <CardTitle className="text-center flex flex-col">{task.title} <small>{format(task.createAt, 'dd-MMM-yyyy')}</small>
            </CardTitle>
            <CardDescription className="text-center">Is Done: {task.isDone ? "Yes" : "No"}</CardDescription>
            <Accordion type="single" collapsible className="w-full" >
              <AccordionItem value="desc" className="">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <CardContent title={task.description}>{task.description}</CardContent>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <CardContent className="flex justify-around flex-col gap-2">
              <Button disabled={task.isDone} onClick={() => completTask(task)}>Complet</Button>
              <Button variant={'destructive'} onClick={() => deleteTask(task.id)}>Delet</Button>
            </CardContent>
            <CardFooter className="text-center">To: {format(task.userDate, 'dd-MMM-yyyy')}</CardFooter>

          </Card>
        ))
        }
      </div>
    </div>
  )
}
