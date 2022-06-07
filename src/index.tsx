import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './client/client';
import App from './components/App';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
