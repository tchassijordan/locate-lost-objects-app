import React from 'react';
import Router from './Routes/Router';
import { AuthContextProvider } from './utils/AuthContext';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;