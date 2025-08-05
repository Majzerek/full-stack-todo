import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { MainProvider } from './context';
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </MainProvider>
  </StrictMode>,
)
