import { useMemo } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createIsomorphLink() {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('apollo-link-schema');
    const { schema } = require('./schema');
    return new SchemaLink({ schema });
  } else {
    const { createHttpLink } = require('apollo-link-http');
    const { setContext } = require('apollo-link-context');

    const httpLink = createHttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    });

    const authLink = setContext((_: any, { headers }: any) => {
      const token = localStorage.getItem('token');
      return {
        headers: {
          ...headers,
          ...(token && { authorization: token }),
        },
      };
    });

    return authLink.concat(httpLink);
  }
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });
}

function initializeApollo(initialState: any) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
