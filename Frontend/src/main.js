import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { getRandomPic } from './utils'
import { HTTP_URL, WS_URL } from './constants'
import moment from 'moment'
import { cache, stateLink } from './state'

const httpLink = new HttpLink({
  uri: HTTP_URL,
  credentials: 'same-origin',
})

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true,
  },
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  }
})

const queryLink = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

const apolloClient = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink,stateLink, authLink, queryLink]),
  connectToDevTools: true,
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  el: '#app',
  router,
  apolloProvider,
  render: h => h(App),
})

Vue.directive(
  'background',
  (el, { value }) =>
    (el.style.background = `url(${value}) no-repeat center/contain`)
)

Vue.directive(
  'avatar',
  (el, { value }) =>
    (el.style.background = `url(${getRandomPic(
      value
    )}) no-repeat center/contain`)
)

Vue.filter('ago', date => moment(date).fromNow())
