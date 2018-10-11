<template>
    <div>
        <slot :checkins="userFeed" />
    </div>
</template>

<script>
import { getUserFeed, checkinSubscription } from '../../database/queries.js'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      userFeed: [],
    }
  },
  computed: {
    user() {
      return this.$store.state.userInfo
    },
  },
  methods: {
    ...mapActions(['snack']),
  },
  apollo: {
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
        updateQuery(_) {
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
  props: {
    limit: {
      type: Number,
      required: false,
      default: 18,
    },
  },
}
</script>

<style>
</style>
