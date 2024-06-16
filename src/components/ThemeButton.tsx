"use client";

import { LoaderCircle, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoaderCircle className="h-6 w-6 animate-spin" />;
  }

  return (
    <Button
      variant="secondary"
      className="sticky right-4 top-4 z-50 h-12 w-12 self-end rounded-full p-2"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      {theme === "dark" ? <Moon size={24} /> : <Sun size={24} />}
    </Button>
  );
}
