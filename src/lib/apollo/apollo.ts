import { NEXT_PUBLIC_GRAPHQL_URL } from '@/app/config'
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: NEXT_PUBLIC_GRAPHQL_URL ?? 'http://wp.siim.cl',
  cache: new InMemoryCache(),
})
