import { NavbarWrapper } from "@/components";
import {
  Dashboard,
  Login,
  NewTask,
  NotFoundPage,
  Profile,
  Register,
  WaitForApprove,
  AccessBlocked,
  Users
} from "@/pages";
import { AdminRoute } from "@/utils/AdmintRoute";
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
            path: '/add-task',
            element: <NewTask />
          },
          {
            path: "/profile",
            element: <Profile />
          },
          {
            path: "/users",
            element: <AdminRoute />,
            children: [
              { path: "/users", element: <Users /> }
            ]
          },



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
  {
    path: "/access-blocked",
    element: <AccessBlocked />
  },

]);