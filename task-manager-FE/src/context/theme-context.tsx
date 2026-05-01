import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, PaletteMode, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import getDesignTokens from "../styles/theme";

const ThemeContext = createContext<{
  mode: PaletteMode;
  toggleTheme: () => void;
}>({
  mode: "light",
  toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export const CustomThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
