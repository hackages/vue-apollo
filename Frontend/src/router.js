import Vue from 'vue'
import Router from 'vue-router'
import { sleep } from './utils'
import { isLoggedIn } from './database/queries'

const Feed = () => import('./components/views/Feed.vue')
const Home = () => import('./components/views/Home.vue')
const BeerDetails = () => import('./components/views/BeerDetails.vue')
const Login = () => import('./components/views/Login.vue')
const UserDetails = () => import('./components/views/UserDetails.vue')

Vue.use(Router)

const redirectIfLoggedIn = path => async (to, from, next) => {
  await sleep(0.5)
  const {
    data: { isLoggedIn: loggedIn },
  } = await router.app.$apollo.query({
    query: isLoggedIn,
  })
  if (loggedIn) {
    next(path)
  } else {
    next()
  }
}

const checkAuth = path => async (to, from, next) => {
  await sleep(0.5)
  const {
    data: { isLoggedIn: loggedIn },
  } = await router.app.$apollo.query({
    query: isLoggedIn,
  })
  if (!loggedIn) {
    next(path)
  } else {
    next()
  }
}

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: redirectIfLoggedIn('/feed'),
    },
    {
      path: '/feed',
      name: 'feed',
      component: Feed,
      beforeEnter: checkAuth('/'),
    },
    {
      path: '/beer/:id',
      name: 'beerDetails',
      component: BeerDetails,
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true,
    },
    {
      path: '/user/:id',
      name: 'userDetails',
      component: UserDetails,
      props: true,
    },
    {
      path: '/*',
      redirect: '/',
    },
  ],
})
