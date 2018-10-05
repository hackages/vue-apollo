<template>
    <beer-container>
        <image-container>
          <div v-background="beer.image_url" ></div>
        </image-container>
        <beer-content>
          <div class="header">
            <h4>{{ beer.name }}</h4>
            <h6>{{ beer.tagline }}</h6>
          </div>
          <div class="footer">
            <styled-button v-if="isLoggedIn" @click="showModal = true" >I'm having it</styled-button>
            <router-link class="styled-link" :to="`beer/${beer.id}`" >Details</router-link>
          </div>
        </beer-content>

        <template v-if="showModal" >
          <checkin-modal :beer="beer" @close="showModal = false" />
        </template>


    </beer-container>
</template>

<script>
import {
  ImageContainer,
  BeerContainer,
  BeerContent,
  StyledButton,
} from '../styled/globalStyles.js'

export default {
  props: {
    beer: {
      type: Object,
      required: true,
    },
  },
  components: {
    ImageContainer,
    BeerContainer,
    BeerContent,
    StyledButton,
    CheckinModal: () => import('../layouts/CheckinModal'),
  },
  data() {
    return {
      showModal: false,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    isLoggedIn() {
      return this.$store.state.isLoggedIn
    },
  },
}
</script>

<style>
.styled-link {
  color: #fda085;
  font-size: 1em;
  text-decoration: none;
}
</style>
