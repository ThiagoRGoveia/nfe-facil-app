import { provideApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache, from } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { useAuthStore } from '@/stores/auth'
import  createUploadLink  from 'apollo-upload-client/createUploadLink.mjs'

// Create http link that supports multipart/form-data for file uploads
const httpLink = createUploadLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000/graphql',
  headers: {
    'Apollo-Require-Preflight': 'true'
  }
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
  link: from([authLink, httpLink]),
  cache,
  defaultOptions: {
    mutate: {
      context: {
        hasUpload: false
      }
    }
  }
})

export default {
  install: () => {
    provideApolloClient(apolloClient)
  }
} 