import { getUserId, getUserName } from "@/services/authServices";
import type { UpdateInfoType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export const useUserData = () => {
  const userName = getUserName();
  const userID = getUserId();

  const [userInfo, setUserInfo] = useState<UpdateInfoType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userID) return;
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:4040/user/${userID}`);
        setUserInfo(res.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Failed to fetch user info:", err);
      }
    };

    fetchUser();
  }, [userID]);

  return {
    userName,
    userID,
    userInfo,
    loading,
    error,
  };
};
