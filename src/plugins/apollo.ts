import { provideApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { useAuthStore } from '@/stores/auth'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000/graphql'
})

// Add auth headers to every request
const authLink = setContext(async (_, { headers }) => {
  const store = useAuthStore()
  const token = await store.getToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
})

export default {
  install: () => {
    provideApolloClient(apolloClient)
  }
} 