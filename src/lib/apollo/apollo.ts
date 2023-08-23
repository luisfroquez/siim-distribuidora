import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'http://wp.siim.cl/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
})
