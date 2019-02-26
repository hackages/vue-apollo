<template>
  <div>
    <slot :checkins="userFeed" />
  </div>
</template>

<script>
import {
  getUserFeed,
  checkinSubscription,
  getUserInfo,
} from '../../database/queries.js'
import { snackMixin } from '../../mixins/snacks.js'

export default {
  props: {
    limit: {
      type: Number,
      default: 18,
    },
  },
  data() {
    return {
      userFeed: [],
    }
  },
  mixin: [snackMixin],
  apollo: {
    userInfo: {
      query: getUserInfo,
    },
    userFeed: {
      query: getUserFeed,
      fetchPolicy: 'cache-and-network',
      variables() {
        return {
          limit: this.limit,
        }
      },
      error(err) {
        this.snack([err.message || err, 'error'])
      },
      subscribeToMore: {
        document: checkinSubscription,
        updateQuery(_, __) {
          // where did my feed go? 😥
          console.log('hello there')
        },
        variables() {
          return {
            onlyBeers: false,
          }
        },
        error(err) {
          this.snack([err.message || err, 'error'])
        },
      },
    },
  },
}
</script>

<style>
</style>
