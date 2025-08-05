import { createContext, useContext, type ReactNode, type FC } from "react";
import { Slide, toast, type ToastOptions } from "react-toastify";


interface AlertContextType {
    showSuccessAlert: (message: string) => void;
    showErrorAlert: (message: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Slide,

};


export const AlertProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const showSuccessAlert = (message: string) => {
    toast.success(message, defaultToastOptions)
  };

  const showErrorAlert = (message: string) => {
    toast.error(message, defaultToastOptions)
  };

  return (
    <AlertContext.Provider value={{ showSuccessAlert, showErrorAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAlertContext = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within a AlertProvider");
  }
  return context;
};