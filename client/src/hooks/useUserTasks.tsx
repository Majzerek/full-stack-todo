import { getUserId } from "@/services/authServices";
import type { TodosType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export const useUserTasks = () => {
  const saved = localStorage.getItem("TODO_LIST");
  const [userTasks, setUserTasks] = useState<TodosType[]>(
    saved ? JSON.parse(saved) : [],
  );
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const userId = getUserId();
    const fetch = async () => {
      await axios
        .get(`http://localhost:4040/user/tasks/${userId}`)
        .then((res) => {
          setUserTasks(res.data);
          setRefetch(false);
        })
        .catch((err) => console.log(err));
    };
    fetch();
  }, [refetch]);

  return {
    userTasks,
    setRefetch,
  };
};
