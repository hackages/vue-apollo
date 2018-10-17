<template>
  <navbar-container 
    v-if="$route.path !== '/'" 
    id="nav">
    <burger 
      :opened="opened" 
      @toggle="toggleOpened()" />
    <flex-row :open="opened" >
      <router-link to="/feed">Home</router-link>
      <router-link :to="`/user/${userInfo.id}`">Profile</router-link>
    </flex-row>
    <flex-row :open="opened" >
      <link-styled-button @click="$emit('logout')" >Log out</link-styled-button>
    </flex-row>
  </navbar-container>
</template>

<script>
import Avatar from './Avatar'
import Burger from './Burger'

import {
  NavbarContainer,
  LinkStyledButton,
  FlexRow,
  NavIcon,
  NavIconContainer,
} from '../styled/globalStyles.js'
import IconSvg from '../../assets/img/beers.svg'
export default {
  components: {
    Avatar,
    NavbarContainer,
    LinkStyledButton,
    FlexRow,
    Burger,
    NavIcon,
    NavIconContainer,
  },
  data() {
    return {
      opened: false,
      test: 0,
      icon: IconSvg,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
  },
  methods: {
    toggleOpened() {
      this.opened = !this.opened
    },
  },
}
</script>
