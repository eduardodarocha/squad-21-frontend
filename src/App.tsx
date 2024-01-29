import React from 'react';
import Login from './pages/login';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import SiteRouterProvider from './routes/routes'
import { ModalControllerProvider } from './providers/modalController';
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ModalControllerProvider>
        <SiteRouterProvider />
      </ModalControllerProvider>
    </ThemeProvider>
  );
}

export default App;
