<template>
  <div>
    <slot
      v-if="onlyBeers"
      :beers="beers"
    />
    <slot
      v-else
      :checkins="checkins"
    />
  </div>
</template>

<script>
import {
  getLatestCheckIns,
  checkinSubscription,
} from '../../database/queries.js'
import { map, prop, dropLast } from 'ramda'
import { snackMixin } from '../../mixins/snacks.js'

const dropTail = dropLast(1)

export default {
  mixins: [snackMixin],
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
  data() {
    return {
      checkins: [],
    }
  },
  computed: {
    beers() {
      return map(prop('beer'))(this.checkins)
    },
  },
  apollo: {
    checkins: {
      query: getLatestCheckIns,
      fetchPolicy: 'cache-and-network',
      variables() {
        return {
          limit: this.limit,
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
}
</script>

<style>
</style>
