import { localStorageFunctions } from "./api";

function getLocalTheme() {
  const localTheme = localStorageFunctions.getTheme();
  const colorTheme = localTheme === "light" ? "light" : "dark";

  const root = window.document.documentElement;
  if (localTheme) {
    root.classList.remove(localTheme);
    root.classList.add(colorTheme);
    return colorTheme;
  } else {
    localStorageFunctions.setTheme(colorTheme);
    root.classList.add(colorTheme);
    return colorTheme;
  }
}

function setTheme(theme: string) {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  localStorageFunctions.setTheme(theme);
  return theme;
}

export { getLocalTheme, setTheme };
