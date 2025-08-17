import { Outlet } from "react-router";
import NavBar from "./NavBar";

export const NavbarWrapper = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};
