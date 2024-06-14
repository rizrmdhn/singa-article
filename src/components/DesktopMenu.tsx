import { Home, Newspaper, Package2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function DesktopMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  function isActiveDesktop(bool: boolean) {
    return bool
      ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary hover:cursor-pointer"
      : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:cursor-pointer";
  }

  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <a
          onClick={() => navigate("/")}
          className="flex items-center gap-2 font-semibold"
        >
          <Package2 className="h-6 w-6" />
          <span className="">Singa</span>
        </a>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <a
            onClick={() => navigate("/")}
            className={isActiveDesktop(location.pathname === "/")}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </a>
          <a
            onClick={() => navigate("/articles")}
            className={isActiveDesktop(location.pathname === "/articles")}
          >
            <Newspaper className="h-4 w-4" />
            Articles
          </a>
        </nav>
      </div>
    </div>
  );
}
