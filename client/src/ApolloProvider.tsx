import React from 'react';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
});

const authLink = setContext(() => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('jwtToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink as any) as any,
  cache: new InMemoryCache(),
});

const Provider = () => {
  console.log('client', client.cache);
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default Provider;
