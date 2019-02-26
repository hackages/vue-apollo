<template>
  <login-container>
    <white-title class="mv3">
      {{ login ? 'Login' : 'Sign Up' }}
    </white-title>
    <column>
      <!-- <form
        action="submit"
        @submit.prevent="confirm()"
      > -->
      <labelled-input
        :id="'username'"
        v-model="username"
        label="Your username"
        type="text"
      />
      <labelled-input
        :id="'password'"
        v-model="password"
        label="You password"
        type="password"
      />
      <login-button
        class="pointer mr2 button"
        @click="confirm()"
      >
        {{ login ? 'login' : 'create account' }}
      </login-button>
      <link-button
        class="pointer button"
        @click="login = !login"
      >
        {{ login ? 'need to create an account?' : 'already have an account?' }}
      </link-button>
      <!-- </form> -->
    </column>
  </login-container>
</template>

<script>
import { signInUser, createUser, logIn } from '../../database/queries.js'
import {
  LoginContainer,
  WhiteTitle,
  Column,
  LoginButton,
  LinkButton,
} from '../styled/globalStyles.js'
import LabelledInput from '../dumb/LabelledInput'
import { snackMixin } from '../../mixins/snacks.js'

const defaults = {
  username: '',
  password: '',
}
export default {
  name: 'Login',
  components: {
    LoginContainer,
    WhiteTitle,
    Column,
    LoginButton,
    LinkButton,
    LabelledInput,
  },
  mixins: [snackMixin],
  data() {
    return {
      ...defaults,
      login: this.$route.params.login || false,
    }
  },
  methods: {
    async confirm() {
      if (!this.login) {
        try {
          await this.$apollo.mutate({
            mutation: createUser,
            variables: {
              username: this.username,
              password: this.password,
            },
          })
        } catch (err) {
          this.snack([err.message || err, 'error'])
        }
      }
      try {
        const {
          data: {
            signInUser: { user: userInfo, token },
          },
        } = await this.$apollo.mutate({
          mutation: signInUser,
          variables: {
            username: this.username,
            password: this.password,
          },
        })
        this.$apollo.mutate({
          mutation: logIn,
          variables: {
            userInfo,
            token,
          },
        })
        this.$router.push('/feed')
        this.snack([
          `Welcome ${this.login ? 'back' : 'to Hackbeer'} ${this.username}`,
          'success',
        ])
      } catch (err) {
        this.snack([err.message || err, 'error'])
      }
    },
  },
}
</script>
