import { FC, useEffect, createContext, useState } from "react";
import { Theme } from "@/types/themeTypes";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const initialTheme =
    (localStorage.getItem("theme") as Theme) ||
    (prefersDarkScheme ? Theme.DARK : Theme.LIGHT);

  const [theme, setTheme] = useState<Theme>(initialTheme);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
