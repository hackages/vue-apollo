<template>
    <rated-beer-container>
        <div class="header">
            <avatar class="profile-picture" :id="checkin.user.id" />
            <user-info>
                <p>{{ checkin.user.username }}</p>
                <span>{{ checkin.createdAt | ago }}</span>
            </user-info>
        </div>
        <div class="body">
            <router-link :to="`/beer/${checkin.beer.id}`" >
                <image-container checkin>
                    <div class="beer-picture" v-background="checkin.beer.image_url"></div>
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
  props: {
    checkin: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Avatar,
    RatedBeerContainer,
    UserInfo,
    ImageContainer,
    BeerInfo,
  },
}
</script>
