import type { FC, ReactNode } from "react";
import { ThemeProvider } from "./themeProvider";
import { AuthProvider } from "./authContext";
import { AlertProvider } from "./alertContext";
// import { UserProvider } from "./userContext"

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AlertProvider>
        <AuthProvider>{children}</AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
};
