import { PaletteMode, ThemeOptions } from "@mui/material";

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: {
            default: "#f3f4f6",
            paper: "#fff",
            header: "#e0e0e0",
          },
          primary: {
            main: "#1565c0",
          },
          secondary: {
            main: "#4caf50",
          },
          text: {
            primary: "#000000de",
            secondary: "#333",
          },
        }
      : {
          background: {
            default: "#18191a",
            paper: "#23272f",
            header: "#2c2f33",
          },
          primary: {
            main: "#90caf9",
          },
          secondary: {
            main: "#81c784",
          },
          text: {
            primary: "#fff",
            secondary: "#b0b3b8",
          },
        }),
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "light" ? "#fff" : "#23272f",
          color: mode === "light" ? "#000000de" : "#fff",
          boxShadow:
            mode === "light" ? undefined : "0 2px 8px 0 rgba(0,0,0,0.2)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "light" ? "#fff" : "#23272f",
          color: mode === "light" ? "#000000de" : "#fff",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: "inherit",
          color: "inherit",
        },
        head: {
          backgroundColor: mode === "light" ? "#f5f7fa" : "#23272f",
          color: mode === "light" ? "#000000de" : "#fff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "light" ? "#fff" : "#23272f",
          color: mode === "light" ? "#000000de" : "#fff",
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "light" ? "#f3f4f6" : "#23272f",
          color: mode === "light" ? "#3CA662" : "#90caf9",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color:
            mode === "light"
              ? "#000000de" // or theme.palette.text.primary
              : "#fff", // or theme.palette.text.primary for dark
        },
      },
    },
  },
});

export default getDesignTokens;
