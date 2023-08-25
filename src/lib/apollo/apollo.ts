import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

export const client = new ApolloClient({
  // uri: 'https://wp.siim.cl/graphql',
  ssrMode: true,
  link: createHttpLink({
    uri: 'http://wp.siim.cl/graphql',
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
})
