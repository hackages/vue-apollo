<template>
    <div>
        <slot v-if="onlyBeers" :beers="beers"  />
        <slot v-else :checkins="checkins" />
    </div>
</template>

<script>
import {
  getLatestCheckIns,
  checkinSubscription,
} from '../../database/queries.js'
import { map, prop, dropLast } from 'ramda'
import { mapActions } from 'vuex'

const dropTail = dropLast(1)

export default {
  data() {
    return {
      checkins: [],
    }
  },
  methods: {
    ...mapActions(['snack']),
  },
  apollo: {
    checkins: {
      query: getLatestCheckIns,
      fetchPolicy: 'cache-and-network',
      variables() {
        return {
          limit: 6,
          onlyBeers: this.onlyBeers,
        }
      },
      error(err) {
        this.snack([err.message || err, 'error'])
      },
      subscribeToMore: {
        document: checkinSubscription,
        updateQuery: (
          { checkins },
          {
            subscriptionData: {
              data: { checkinAdded },
            },
          }
        ) => ({
          checkins: [checkinAdded, ...dropTail(checkins)],
        }),
        variables() {
          return {
            onlyBeers: this.onlyBeers,
          }
        },
        error(err) {
          this.snack([err.message || err, 'error'])
        },
      },
    },
  },
  computed: {
    beers() {
      return map(prop('beer'))(this.checkins)
    },
  },
  props: {
    limit: {
      type: Number,
      required: false,
      default: Number.MAX_SAFE_INTEGER,
    },
    onlyBeers: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style>
</style>
