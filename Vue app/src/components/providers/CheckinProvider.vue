<template>
    <div>
        <slot :checkin="checkin" >
        </slot>
    </div>
</template>

<script>
import { getCheckIn } from '../../database/queries.js'

export default {
  apollo: {
    checkin: {
      query: getCheckIn,
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
