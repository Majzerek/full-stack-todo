import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./config/axios.ts"
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ContextProvider } from './context';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ContextProvider>
  </StrictMode>,
)
