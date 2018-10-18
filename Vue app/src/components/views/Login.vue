<template>
  <login-container>
    <white-title class="mv3">{{ login ? 'Login' : 'Sign Up' }}</white-title>
    <column>
      <labelled-input 
        :id="'username'" 
        v-model="username" 
        label="Your username" 
        type="text" />
      <labelled-input 
        :id="'password'" 
        v-model="password" 
        label="You password" 
        type="password" />
      <login-button
        class="pointer mr2 button"
        @click="confirm()">
        {{ login ? 'login' : 'create account' }}
      </login-button>
      <link-button
        class="pointer button"
        @click="login = !login">
        {{ login ? 'need to create an account?' : 'already have an account?' }}
      </link-button>
    </column>
  </login-container>
</template>

<script>
import { signInUser, createUser } from '../../database/queries.js'
import {
  LoginContainer,
  WhiteTitle,
  Column,
  LoginButton,
  LinkButton,
} from '../styled/globalStyles.js'
import LabelledInput from '../dumb/LabelledInput'
import { mapActions } from 'vuex'

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
  data() {
    return {
      ...defaults,
      login: this.$route.params.login || false,
    }
  },
  methods: {
    ...mapActions(['snack']),
    async confirm() {
      if (!this.login) {
        try {
          // How is this registering a new user? 🤔
          // Note that I want you to be able to log in first before registering
          console.log('General Kenobi')
        } catch (err) {
          this.snack([err.message || err, 'error'])
        }
      }
      try {
        const {
          data: { signInUser: payload },
        } = await this.$apollo.mutate({
          mutation: signInUser,
          variables: {
            // I'm not sure this data is correct 🤨
            'hello there': 'general Kenobi',
          },
        })
        this.$store.dispatch('login', payload)
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
