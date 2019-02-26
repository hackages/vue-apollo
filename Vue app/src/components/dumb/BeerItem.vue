<template>
  <beer-container>
    <image-container>
      <div v-background="beer.image_url" />
    </image-container>
    <beer-content>
      <div class="header">
        <h4>{{ beer.name }}</h4>
        <h6>{{ beer.tagline }}</h6>
      </div>
      <div class="footer">
        <styled-button
          v-if="isLoggedIn"
          @click="showModal = true"
        >
          I'm having it
        </styled-button>
        <router-link
          :to="`beer/${beer.id}`"
          class="styled-link"
        >
          Details
        </router-link>
      </div>
    </beer-content>

    <template v-if="showModal">
      <checkin-modal
        :beer="beer"
        @close="showModal = false"
      />
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
import { isLoggedIn } from '../../database/queries.js'

export default {
  components: {
    ImageContainer,
    BeerContainer,
    BeerContent,
    StyledButton,
    CheckinModal: () => import('../layouts/CheckinModal'),
  },
  props: {
    beer: {
      type: Object,
      required: true,
    },
  },
  apollo: {
    isLoggedIn: {
      query: isLoggedIn,
    },
  },
  data() {
    return {
      showModal: false,
    }
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
