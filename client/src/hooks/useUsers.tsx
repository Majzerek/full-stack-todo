import type { UsersStatisticType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserRole } from "./useUserRole";

export const useUsers = () => {
  const role = useUserRole();
  const [usersStat, setUsersStat] = useState<UsersStatisticType | null>(null);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (role !== "ADMIN") return;
    const fetchUsers = async () => {
      setLoading(true);
      await axios
        .get("http://localhost:4040/users/statistics")
        .then((res) => {
          setUsersStat(res.data);
          setRefetch(false);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    };
    fetchUsers();
  }, [refetch, role]);

  return {
    usersStat,
    setRefetch,
    loading
  };
};
