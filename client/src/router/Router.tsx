import { NavbarWrapper } from "@/components";
import { Dashboard, Login, NewTask, NotFoundPage, Register, WaitForApprove } from "@/pages";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },

  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <NavbarWrapper />,
        children: [
          {
            path: "/",
            element: <Dashboard />
          },
          {
            path:'/add-task',
            element:<NewTask />
          }
          // {
          //   path: "/users",
          //   element: <AdminRoute />,
          //   children: [
          //     { path: "/users", element: <Users /> }
          //   ]
          // },

          // {
          //   path: "/profile",
          //   element: <Profile />
          // },

        ],

      },
    ],
  },

  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/wait-for-approve",
    element: <WaitForApprove />
  },

]);