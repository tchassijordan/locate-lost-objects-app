import React from 'react';
import Router from './Routes/Router';
import { AuthContextProvider } from './utils/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
