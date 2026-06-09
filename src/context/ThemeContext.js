import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => setDark(!dark);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <div className={dark ? "bg-dark text-white min-h-screen" : "min-h-screen"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
