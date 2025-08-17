import { getToken, getUserId } from "@/services/authServices";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoutes = () => {
  const storedToken = getToken();
  const userId = getUserId();
  const status = localStorage.getItem("userStatus");

  return storedToken && userId && status === "ACTIVE" ? (
    <Outlet />
  ) : storedToken && userId && status !== "ACTIVE" ? (
    <Navigate to="wait-for-approve" />
  ) : (
    <Navigate to="/login" />
  );
};
