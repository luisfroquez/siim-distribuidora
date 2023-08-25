import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const clientSide = typeof window === 'undefined'

export const client = new ApolloClient({
  ssrMode: clientSide,
  headers: { 'Content-Type': 'application/json' },
  link: createHttpLink({
    uri: 'http://wp.siim.cl/graphql',
    fetch,
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
})
