import { CircleUser, Home, Menu, Newspaper, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocation, useNavigate } from "react-router-dom";
import useLogout from "@/hooks/useLogout";
import useSetTheme from "@/hooks/useSetTheme";
import useAuthUser from "@/hooks/useAuthUser";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
export default function MobileMenu() {
  const { mutate, status } = useLogout();
  const { mutate: setThemeMutation } = useSetTheme();
  const { data, status: authUserStatus } = useAuthUser();

  const navigate = useNavigate();
  const location = useLocation();

  function isActiveMobile(bool: boolean) {
    return bool
      ? "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
      : "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground";
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <a
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Singa</span>
            </a>
            <a
              onClick={() => navigate("/")}
              className={isActiveMobile(location.pathname === "/")}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </a>
            <a
              onClick={() => navigate("/articles")}
              className={isActiveMobile(location.pathname === "/articles")}
            >
              <Newspaper className="h-5 w-5" />
              Articles
            </a>
          </nav>
        </SheetContent>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto">
          {authUserStatus === "pending" ? (
            <Skeleton className="h-10 w-10" />
          ) : (
            <Avatar className="h-10 w-10 border">
              <AvatarImage alt={data?.name} src={data?.avatarUrl ?? ""} />
              <AvatarFallback>{data?.name?.[0]}</AvatarFallback>
            </Avatar>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setThemeMutation()}>
            Change Theme
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => mutate()}
            disabled={status === "pending"}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
