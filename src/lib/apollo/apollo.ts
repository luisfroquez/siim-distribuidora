import { NEXT_PUBLIC_WORDPRESS_API_URL } from '@/app/config'
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: `${NEXT_PUBLIC_WORDPRESS_API_URL ?? ''}/graphql`,
  cache: new InMemoryCache(),
})
