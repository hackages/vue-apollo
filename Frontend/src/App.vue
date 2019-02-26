<template>
  <div id="app">
    <navbar
      v-if="showNav"
      @logout="logout()"
    />
    <keep-alive>
      <router-view />
    </keep-alive>
    <snacks />
  </div>
</template>

<script>
import Navbar from './components/dumb/Navbar'
import Snacks from './components/containers/Snacks'
import { getUser, logIn, logOut, isLoggedIn } from './database/queries'
import { greet } from './utils.js'
import { snackMixin } from './mixins/snacks.js'

export default {
  components: {
    Navbar,
    Snacks,
  },
  mixins: [snackMixin],
  // auto log in from token
  apollo: {
    isLoggedIn: {
      query: isLoggedIn,
    },
    user: {
      query: getUser,
      variables: {
        detailed: false,
        history: false,
      },
      async result({ data: { user } }) {
        if (!this.isLoggedIn) {
          const { data } = await this.$apollo.mutate({
            mutation: logIn,
            variables: {
              userInfo: user,
              token: localStorage.getItem('token'),
            },
          })
          this.snack([greet(user.username), 'success'])
        }
      },
      skip() {
        // Do we really want to skip that request every time?
        return true
      },
      error() {
        this.snack(['You need to sign in again', 'error'])
        localStorage.removeItem('token')
        this.$router.push({ name: 'login', params: { login: true } })
      },
    },
  },
  computed: {
    showNav() {
      return this.isLoggedIn && this.$route.path !== '/login'
    },
  },
  methods: {
    logout() {
      this.$apollo.mutate({
        mutation: logOut,
      })
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
