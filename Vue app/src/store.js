import Vue from 'vue'
import Vuex from 'vuex'
import { take } from 'ramda'
import uniqid from 'uniqid'
import { sleep } from './utils'
import { SNACK_LIFETIME } from './constants'

Vue.use(Vuex)

const defaultUser = {
  id: '',
  username: '',
  friends: [],
}

const store = new Vuex.Store({
  state: {
    userInfo: defaultUser,
    isLoggedIn: false,
    snacks: [],
  },
  getters: {
    getUser: state => state.userInfo,
    isLoggedIn: state => !!state.userInfo.username,
  },
  mutations: {
    setUserInfo(state, { username, id, friends }) {
      state.userInfo = {
        username,
        id,
        friends: friends.map(friend => friend.id),
      }
    },
    logIn(state) {
      state.isLoggedIn = true
    },
    logOut(state) {
      state.isLoggedIn = false
      state.userInfo = defaultUser
    },
    addSnack(state, snack) {
      state.snacks = take(5, [snack, ...state.snacks])
    },
    clearSnack(state, id) {
      state.snacks = state.snacks.filter(snack => snack.id !== id)
    },
  },
  actions: {
    login({ commit }, { user, token }) {
      localStorage.setItem('token', token)
      commit('logIn')
      commit('setUserInfo', user)
    },
    logout({ commit }) {
      localStorage.clear('token')
      commit('logOut')
    },
    async snack({ commit }, [message, type = 'default']) {
      const id = uniqid()
      const snack = { id, message, type }
      commit('addSnack', snack)
      await sleep(SNACK_LIFETIME)
      commit('clearSnack', id)
    },
  },
})

export default store
