import { getUserName } from "@/services/authServices";
import { createContext, useContext, type FC, type ReactNode } from "react"


type UserContextType = {
  userName: string;
}

const UserContext = createContext<UserContextType | null>(null);


export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const userName = getUserName() || 'User';
  

  const VALUES = {
   
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
  if(!context) {
    throw new Error("useUserContext must be used within UserProvider")
  }
  return context;
}