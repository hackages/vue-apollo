<template>
  <home-container>
    <home-button-container>
      <h1>Welcome on HackBeer ! </h1>

      <router-link :to="{ name: 'login', params: { login: true } }" >Sign In</router-link>
      <router-link to="/login">Register</router-link>
    </home-button-container>
    <last-beers />
  </home-container>
</template>

<script>
import LastBeers from '../containers/LastBeers'
import { HomeContainer, HomeButtonContainer } from '../styled/globalStyles.js'
export default {
  components: {
    LastBeers,
    HomeContainer,
    HomeButtonContainer,
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}

li {
  display: inline-block;
}

ul {
  float: right;
}

li {
  border: solid 2px black;
  padding: 15px 20px;
  margin-right: 15px;
}
</style>
