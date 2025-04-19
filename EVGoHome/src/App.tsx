import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { CarProvider } from './context/CarContext';
import { ChargerProvider } from './context/ChargerContext';

function App() {
  return (
    <ThemeProvider>
      <CarProvider>
        <ChargerProvider>
          <Router>
            <AppRoutes />
          </Router>
        </ChargerProvider>
      </CarProvider>
    </ThemeProvider>
  );
}

export default App;