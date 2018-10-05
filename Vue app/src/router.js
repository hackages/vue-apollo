import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import { sleep } from './utils'

const Feed = () => import('./components/views/Feed.vue')
const Home = () => import('./components/views/Home.vue')
const BeerDetails = () => import('./components/views/BeerDetails.vue')
const Login = () => import('./components/views/Login.vue')
const UserDetails = () => import('./components/views/UserDetails.vue')

Vue.use(Router)

const redirectIfLoggedIn = path => async (to, from, next) => {
  await sleep(0.5)
  if (store.state.isLoggedIn) {
    next(path)
  } else {
    next()
  }
}

const checkAuth = path => async (to, from, next) => {
  await sleep(0.5)
  if (!store.state.isLoggedIn) {
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

//router.beforeEach(checkAuth)
