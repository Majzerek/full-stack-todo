import {  NavbarWrapper  } from "@/components";
import {
  Dashboard,
  Login,
  NewTask,
  NotFoundPage,
  Register,
  WaitForApprove,
  AccessBlocked,
} from "@/pages";
import Users from "@/pages/Admin/Users";
import { AdminRoute } from "@/utils/AdmintRoute";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Profile = lazy(() => import("@/pages/Profile/Profile"));
const ToDoList = lazy(() => import("@/pages/TodoList/TodoList"));

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
            element: <Dashboard />,
          },
          {
            path: "/add-task",
            element: <NewTask />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/to-do-list",
            element: <ToDoList />,
          },

          {
            path: "/users",
            element: <AdminRoute />,
            children: [
              {
                path: "/users", 
                element: <Users />,
              }],
          },

        ],
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/wait-for-approve",
    element: <WaitForApprove />,
  },
  {
    path: "/access-blocked",
    element: <AccessBlocked />,
  },
]);
