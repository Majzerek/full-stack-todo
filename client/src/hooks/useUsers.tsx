import type { UsersStatisticType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserRole } from "./useUserRole";

export const useUsers = () => {
  const role = useUserRole();
  const [usersStat, setUsersStat] = useState<UsersStatisticType | null>(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    if (role !== "ADMIN") return;
    const fetchUsers = async () => {
      await axios
        .get("http://localhost:4040/users/statistics")
        .then((res) => {
          setUsersStat(res.data);
          setRefetch(false);
        })
        .catch((err) => console.error(err));
    };
    fetchUsers();
  }, [refetch, role]);

  return {
    usersStat,
    setRefetch,
  };
};
