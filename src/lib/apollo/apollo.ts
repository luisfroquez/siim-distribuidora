import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client'

const httpLink = new HttpLink({
  uri: 'http://wp.siim.cl/graphql',
})

export const client = new ApolloClient({
  // uri: 'https://wp.siim.cl/graphql',
  cache: new InMemoryCache(),
  link: from([httpLink]),
})
