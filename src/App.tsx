import { ThemeProvider } from '@mui/material';
import theme from './theme';
import SiteRouterProvider from './routes/routes'
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SiteRouterProvider/>
    </ThemeProvider>
  );
}

export default App;
