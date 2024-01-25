import React from 'react';
import Login from './pages/login';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Login/>
    </ThemeProvider>
  );
}

export default App;
