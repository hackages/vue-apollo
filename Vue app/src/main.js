import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { getRandomPic } from './utils'
import store from './store'
import { HTTP_URL, WS_URL } from './constants'
import moment from 'moment'

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

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  el: '#app',
  router,
  store,
  provide: apolloProvider.provide(),
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
