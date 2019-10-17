import React from 'react'
import { ApolloClient } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const Apollo = ({ token, children }) => {
  const link = createHttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default Apollo
