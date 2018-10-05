<template>
  <div id="app">
    <navbar v-if="showNav" @logout="logout()" />
    <keep-alive>
      <router-view/>
    </keep-alive>
    <snacks />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar from './components/dumb/Navbar'
import Snacks from './components/containers/Snacks'
import { getUser } from './database/queries'
import { greet } from './utils.js'

export default {
  components: {
    Navbar,
    Snacks,
  },
  // auto log in from token
  apollo: {
    user: {
      query: getUser,
      variables: {
        detailed: false,
        history: false,
      },
      result({ data: { user } }) {
        if (!this.$store.state.isLoggedIn) {
          this.$store.dispatch('login', {
            user,
            token: localStorage.getItem('token'),
          })
          this.snack([greet(user.username), 'success'])
        }
      },
      skip() {
        return !this.$store.state.isLoggedIn && !localStorage.getItem('token')
      },
      error() {
        this.snack(['You need to sign in again', 'error'])
        localStorage.removeItem('token')
        this.$router.push({ name: 'login', params: { login: true } })
      },
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    showNav() {
      return this.$store.state.isLoggedIn && this.$route.path !== '/login'
    },
  },
  methods: {
    ...mapActions(['snack']),
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
  },
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  width: 100%;
  height: 100%;
  font-size: 14px;
  padding: 0;
  margin: 0;
  background-color: #f5f2e8;
}
* {
  box-sizing: border-box;
}
</style>
