import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import palette from "./Palette";

let theme = createTheme({
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
    fontFamily: `'Bricolage Grotesque', sans-serif`,
    h1: {
      fontWeight: 500,
      fontSize: '4rem', 
    },
    body1: {
      fontWeight: 400,
      fontSize:"1.125rem", 
    }
  },

});

theme = responsiveFontSizes(theme)


export default theme;
