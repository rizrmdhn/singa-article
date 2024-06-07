import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import useTheme from "@/hooks/useTheme";
import useSetTheme from "@/hooks/useSetTheme";

export default function ThemeButton() {
  const { data } = useTheme();
  const { mutate: setThemeMutation } = useSetTheme();

  return (
    <Button
      variant="secondary"
      className="sticky right-4 top-4 z-50 h-12 w-12 self-end rounded-full p-2"
      onClick={() => setThemeMutation()}
    >
      {data === "dark" ? <Moon size={24} /> : <Sun size={24} />}
    </Button>
  );
}
