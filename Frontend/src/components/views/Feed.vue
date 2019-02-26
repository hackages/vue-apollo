<template>
  <div class="Feed">
    <h1>Feed</h1>
    <div>
      <h2>Have you tried these beers?</h2>
      <random-beers />
    </div>

    <h1>Had most recently</h1>
    <div>
      <user-feed-provider>
        <checkin-list 
          slot-scope="{checkins}" 
          :checkins="checkins"
        />
      </user-feed-provider>
    </div>
  </div>
</template>

<script >
import RandomBeers from '../containers/RandomBeers.vue'
import UserFeedProvider from '../providers/UserFeedProvider'
import CheckinList from '../containers/CheckinList'

export default {
  components: {
    RandomBeers,
    UserFeedProvider,
    CheckinList,
  },
}
</script>
