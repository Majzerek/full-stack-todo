import { removeToken, setToken } from "@/services/authServices";
import axios from "axios";
import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from "react";


type AuthContextType = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  login: (data: Record<string, string>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const login = (data: Record<string, string>) => {

    //temp
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("userName", data.userName);
    localStorage.setItem("userStatus", data.userStatus);
    setToken(data.token);
    setIsLogin(true);

  };

  const logout = () => {
    removeToken();
    setIsLogin(false);

  };
  useEffect(() => {
    const value = {isLogin}
    const send = async () => {
      await axios.post('http://localhost:4040/isLogin', value)
        .then(() => { })
        .catch((err) => console.error(err))
    }
    send();
  }, [isLogin])
  const VALUES = {
    isLogin,
    setIsLogin,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={VALUES}>
      {children}
    </AuthContext.Provider>
  )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider")
  }
  return context;
}