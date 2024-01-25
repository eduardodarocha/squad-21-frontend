import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5522",
    },
    secondary: {
      main: "#446",
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
  }
});

export default theme;
