import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5522",
    },
    secondary: {
      main: "#446",
      dark: "#113"
    },
    error: {
      main: '#DD0000',
    },
    warning: {
      main: '#FF8833',
    },
    info: {
      main: '#315FCE',
    },
    success: {
      main: '#118822',
    },
    grey: {
      50: '#0000001F',
      100: '#00000061',
      200: '#E6E9F2'
      // ... até 900
    },
  }
});

export default theme;
