import type { FC, ReactNode } from "react"
import { ThemeProvider } from "./themeProvider"

export const MainProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      {children}

    </ThemeProvider>
  )
}
