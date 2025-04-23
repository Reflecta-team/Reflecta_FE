import { createTheme } from "@mui/material/styles";
import palette from "./Palette";

const theme = createTheme({
  palette: {
    primary: {
      main: palette.deepBlue,
    },
    secondary: {
      main: palette.gradientPurple,
    },
    background: {
      default: palette.softLightGray,
      paper: palette.pureWhite,
    },
    text: {
      primary: palette.darkGrayText,
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

export default theme;
