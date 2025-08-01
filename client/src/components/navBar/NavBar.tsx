import { LogOut, Moon, Settings, Sun, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { useTheme } from "@/context"

const Navbar = () => {

  const { setTheme } = useTheme();

  return (
    <nav className="p-4 flex items-center justify-between bg-sidebar">
      <div className="flex items-center gap-4">
        <span className="sm:mr-2 md:mr-20">TodoApp</span>
        <Link to={'/'} className=" hidden sm:hidden md:block" >Dashboard</Link>
        <Link to={'/'} className="hidden sm:hidden md:block" >Dashboard</Link>
        <Link to={'/'}  className="hidden sm:hidden md:block">Dashboard</Link>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
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
        <DropdownMenu >
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={'https://avatars.githubusercontent.com/u/106928059?v=4'} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10} className="mr-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-[1.2rem] w-[1.2rem] mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
              Settings
            </DropdownMenuItem>
          
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant={'destructive'} size={"icon"}><LogOut /></Button>
      </div>
    
    </nav>
   
  )
}

export default Navbar