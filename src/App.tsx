import React from 'react';
import Router from './Routes/Router';
import { AuthContextProvider } from './lib/Auth/AuthContext.js';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

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
