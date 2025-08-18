import "./config/axios";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ContextProvider } from "./context";
import { ToastContainer } from "react-toastify";
import { Loader } from "./components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
      <ToastContainer />
    </ContextProvider>
  </StrictMode>,
);
