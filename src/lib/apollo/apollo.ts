import { ApolloClient, InMemoryCache } from '@apollo/client'

const clientSide = typeof window === 'undefined'

export const client = new ApolloClient({
  ssrMode: clientSide,
  uri: 'https://wp.siim.cl/?graphql',
  cache: new InMemoryCache(),
})
