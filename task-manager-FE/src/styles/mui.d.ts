import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    header: string;
  }

  interface PaletteBackground {
    header: string;
  }

  interface PaletteBackgroundOptions {
    header?: string;
  }
}
