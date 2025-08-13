import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, Loader } from "@/components";
import { useAlertContext } from "@/context";
import { useUserTasks } from "@/hooks/useUserTasks";
import type { TodosType } from "@/types";
import axios from "axios";
import { format } from "date-fns";
import { useState } from "react";



export const TasksList = () => {

  const { userTasks, setRefetch } = useUserTasks();
  const [loading, setLoading] = useState(false);
  const {showErrorAlert,showSuccessAlert} = useAlertContext()

  const completTask = async(task:TodosType) => {
    setLoading(true)
    const {isDone, ...rest} = task;

    await axios.post('http://localhost:4040/task/completed', {...rest, isDone: true})
    .then(() => {
      showSuccessAlert('Update Completed!')
      setLoading(false)
      setRefetch(true)
    })
    .catch((err) => showErrorAlert(err.data.message))
  } 
  return (
    <div className="w-full  flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 p-5">

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
              <Button onClick={()=> completTask(task)}>{loading ? <Loader /> : "Complet"}</Button>
              <Button variant={'destructive'}>Delet</Button>
            </CardContent>
            <CardFooter className="text-center">To: {format(task.userDate, 'dd-MMM-yyyy')}</CardFooter>

          </Card>
        ))
        }
      </div>
    </div>
  )
}
