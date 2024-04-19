import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#1D2D3C',
    },
    secondary: {
      main: '#FCBB43',
    },
    red: {
      main: '#FF1105',
    },
  },
});

export default theme
