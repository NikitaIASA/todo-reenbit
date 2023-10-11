import Sun from "@/assets/images/Sun.svg?react";
import Moon from "@/assets/images/Moon.svg?react";
import { useTheme } from "@/hooks/useTheme";
import { Theme } from "@/types/themeTypes";

import "./ThemeSwitcher.scss";

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <input
        className="theme-switcher__input"
        type="checkbox"
        id="theme-switcher__toggle"
        checked={theme === Theme.DARK}
        onChange={toggleTheme}
      />
      <label className="theme-switcher__label" htmlFor="theme-switcher__toggle">
        <Sun />
        <Moon />
      </label>
    </div>
  );
};
