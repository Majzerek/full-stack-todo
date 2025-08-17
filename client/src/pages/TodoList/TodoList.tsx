import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  Loader,
  Wrapper,
} from "@/components";
import { useAlertContext } from "@/context";
import { useUserTasks } from "@/hooks/useUserTasks";
import type { TodosType } from "@/types";
import axios from "axios";
import { format } from "date-fns";
import { useState } from "react";

export const TodoList = () => {
  const { userTasks, setRefetch } = useUserTasks();
  const [loading, setLoading] = useState(false);
  const { showErrorAlert, showSuccessAlert } = useAlertContext();

  const completTask = async (task: TodosType) => {
    setLoading(true);

    await axios
      .post("http://localhost:4040/task/completed", task)
      .then(() => {
        showSuccessAlert("Update Completed!");
        setLoading(false);
        setRefetch(true);
      })
      .catch((err) => {
        showErrorAlert(err.response.data.message);
        setLoading(false);
      });
  };
  const deleteTask = async (id: string) => {
    setLoading(true);

    await axios
      .delete(`http://localhost:4040/task/delete/${id}`)
      .then((res) => {
        showSuccessAlert(res.data.message);
        setLoading(false);
        setRefetch(true);
      })
      .catch((err) => {
        showErrorAlert(err.response.data.message);
        setLoading(false);
      });
  };
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h1 className="text-center text-3xl">To-Do-List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4  p-5">
        {userTasks.map((task) => (
          <Card
            key={task.id}
            className={
              task.isDone
                ? "bg-border opacity-55 p-2 w-70 h-fit"
                : "p-2 w-70 h-fit"
            }
          >
            <CardTitle className="text-center flex flex-col">
              {task.title.toUpperCase()}{" "}
              <small>{format(task.createAt, "dd-MMM-yyyy")}</small>
            </CardTitle>
            <CardDescription className="text-center text-shadow-2xs text-shadow-black">
              Is Done: {task.isDone ? "Yes" : "No"}
            </CardDescription>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="desc" className="">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <CardContent title={task.description}>
                    {task.description}
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <CardContent className="flex justify-around flex-col gap-2">
              <Button disabled={task.isDone} onClick={() => completTask(task)}>
                Complet
              </Button>
              <Button
                variant={"destructive"}
                className="z-10"
                onClick={() => deleteTask(task.id)}
              >
                Delet
              </Button>
            </CardContent>

            <div className="flex gap-2 flex-wrap">
              {task.hashTag?.map((hash, index) => (
                <Badge key={hash} className={`bg-chart-${index + 1}`}>
                  {hash}
                </Badge>
              ))}
            </div>
            <CardFooter className="text-center">
              To: {format(task.userDate, "dd-MMM-yyyy")}
            </CardFooter>
          </Card>
        ))}
      </div>
    </Wrapper>
  );
};
