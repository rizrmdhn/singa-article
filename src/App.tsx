import { useEffect } from "react";
import { Toaster } from "./components/ui/toaster";
import Routes from "./routes";
import useTheme from "./hooks/useTheme";
import { setTheme } from "./lib/theme";

function App() {
  const { data: theme } = useTheme();

  useEffect(() => {
    setTheme(theme ?? "light");
  }, [theme]);

  return (
    <>
      <Routes />
      <Toaster />
    </>
  );
}

export default App;
