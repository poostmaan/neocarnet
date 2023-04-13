import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#0205a1e8",
    },
    secondary: {
      main: "#1acc8d",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});
