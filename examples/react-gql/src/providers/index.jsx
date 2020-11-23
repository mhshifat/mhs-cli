import { ApolloProvider } from "@apollo/client";
import React from 'react';
import graphqlClient from '../graphql';

const Providers = ({ children }) => {
  return (
    <ApolloProvider client={graphqlClient}>
      {children}
    </ApolloProvider>
  );
};

export default Providers;