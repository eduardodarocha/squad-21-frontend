import { ThemeProvider } from '@mui/material';
import theme from './theme';
import SiteRouterProvider from './routes/routes'
import { ModalControllerProvider } from './providers/modalController';
import { ImageControllerProvider } from './providers/imageController';
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ModalControllerProvider>
        <ImageControllerProvider>
          <SiteRouterProvider />
        </ImageControllerProvider>
      </ModalControllerProvider>
    </ThemeProvider>
  );
}

export default App;
