import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://wp.siim.cl/graphql',
  cache: new InMemoryCache(),
})
