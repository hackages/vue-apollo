<template>
  <div>
    <slot :checkin="checkin" />
  </div>
</template>

<script>
import { getCheckIn } from '../../database/queries.js'

export default {
  apollo: {
    checkin: {
      query() {
        return this.query
      },
      variables() {
        return {
          id: this.id,
        }
      },
      fetchPolicy: 'cache-and-network',
    },
  },
  props: {
    id: {
      type: Number,
      default: null,
      required: false,
    },
  },
  data() {
    return {
      checkin: {},
    }
  },
}
</script>
