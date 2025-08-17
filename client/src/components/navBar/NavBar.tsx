import { LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext, useTheme } from "@/context";
import { ITEMS_NAV, ITEMS_NAV_ADMIN } from "@/utils";
import { NavDropdown } from "./navDropdown";
import { useUserRole } from "@/hooks/useUserRole";

const Navbar = () => {
  const { setTheme } = useTheme();
  const href = useLocation();
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const role = useUserRole();
  const avatar = localStorage.getItem("Avatar");
  const DoLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="p-2 flex items-center justify-between bg-sidebar w-full fixed z-10 border-b-1 border-b-accent-foreground ">
      <div className="flex items-center gap-4">
        <span className="mr-2 ">TodoApp</span>
        {role === "ADMIN"
          ? ITEMS_NAV_ADMIN.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                title={item.title.toUpperCase()}
                className={
                  href.pathname === item.url
                    ? "text-sidebar-primary transition-colors hidden sm:block"
                    : "hidden sm:block"
                }
              >
                {item.title.toUpperCase()}
              </Link>
            ))
          : ITEMS_NAV.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                title={item.title.toUpperCase()}
                className={
                  href.pathname === item.url
                    ? "text-sidebar-primary transition-colors hidden sm:block"
                    : "hidden sm:block"
                }
              >
                {item.title.toUpperCase()}
              </Link>
            ))}
        <NavDropdown />
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" title="Theme">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar
              title="Profil & Settings"
              className="cursor-pointer hover:scale-120 active:scale-90 "
            >
              <AvatarImage
                src={
                  avatar
                    ? avatar
                    : "https://images.unsplash.com/photo-1588444364888-a6a27830dab8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                className=""
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10} className="mr-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to={"/profile"}>
              <DropdownMenuItem title="Profil Info">
                <User className="h-[1.2rem] w-[1.2rem] mr-2" />
                Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem title="Settings">
              <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
              Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant={"destructive"} size={"icon"} onClick={DoLogout}>
          <LogOut />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
