import { useUserRole } from "@/hooks/useUserRole";
import { Outlet, Navigate } from "react-router-dom";

export const AdminRoute = () => {
  const role = useUserRole();

  if (!role) return null;

  return role === "ADMIN" ? <Outlet /> : <Navigate to="/access-blocked" />; //
};
