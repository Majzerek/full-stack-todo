import { getUserId, getUserName } from "@/services/authServices";
import type { UpdateInfoType } from "@/types";
import axios from "axios";
import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from "react"


type UserContextType = {
  userName: string;
  userInfo: UpdateInfoType | null,
}

const UserContext = createContext<UserContextType | null>(null);


export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const userName = getUserName() || '';
  const userID = getUserId();
  const [userInfo, setUserInfo] = useState<UpdateInfoType | null>(null);

 
  useEffect(() => {
    const fetchUser = async () => {
    if (!userID) return;

    try {
      const res = await axios.get(`http://localhost:4040/user/${userID}`);
      setUserInfo(res.data);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  fetchUser();
  }, [userID]);
  
  

  const VALUES = {
    userInfo,
    userName
  }
  return (
    <UserContext.Provider value={VALUES}>
      {children}
    </UserContext.Provider>
  )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within UserProvider")
  }
  return context;
}