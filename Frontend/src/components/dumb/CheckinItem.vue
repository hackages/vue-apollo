<template>
  <rated-beer-container>
    <div class="header">
      <avatar 
        :id="checkin.user.id" 
        class="profile-picture"
      />
      <user-info>
        <p>{{ checkin.user.username }}</p>
        <span>{{ checkin.createdAt | ago }}</span>
      </user-info>
    </div>
    <div class="body">
      <router-link :to="`/beer/${checkin.beer.id}`">
        <image-container checkin>
          <div 
            v-background="checkin.beer.image_url" 
            class="beer-picture"
          />
        </image-container>
      </router-link>
      <beer-info>
        <h5>{{ checkin.beer.name }}</h5>
        <p>Rating: {{ checkin.rating }}</p>
        <div>&#171; {{ checkin.text }}&#187; </div>
      </beer-info>
    </div>
  </rated-beer-container>
</template>

<script>
import Avatar from './Avatar.vue'
import {
  RatedBeerContainer,
  UserInfo,
  ImageContainer,
  BeerInfo,
} from '../styled/globalStyles.js'
export default {
  components: {
    Avatar,
    RatedBeerContainer,
    UserInfo,
    ImageContainer,
    BeerInfo,
  },
  props: {
    checkin: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
