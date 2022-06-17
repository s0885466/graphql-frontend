import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.BACKEND_URI,
  cache: new InMemoryCache(),
});
