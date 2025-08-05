import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { ITEMS_NAV } from "@/utils"
import { Link, useLocation } from "react-router-dom"
import { Menu } from "lucide-react"

export const NavDropdown = () => {

  const position = useLocation();
 
  return (
    <div className="block sm:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={'icon'}>
            <Menu className="h-[1.2rem] w-[1.2rem] scale-100"/>
            <span className="sr-only">Mobile Navigation</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Position</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position.pathname} >
            {ITEMS_NAV.map((item) => (
              <Link key={item.id} to={item.url}><DropdownMenuRadioItem value={item.url}>{item.title.toUpperCase()}</DropdownMenuRadioItem></Link>
            ))}

          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
