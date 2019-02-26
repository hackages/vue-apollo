<template>
  <div>
    <slot :beer="beer" />
  </div>
</template>

<script>
import { getBeer } from '../../database/queries.js'

export default {
  apollo: {
    beer: {
      query: getBeer,
      variables() {
        return {
          id: this.id || Math.round(Math.random() * 160) + '',
          detailed: this.detailed,
        }
      },
      fetchPolicy: 'cache-and-network',
    },
  },
  props: {
    id: {
      type: String,
      default: null,
      required: false,
    },
    detailed: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      beer: {},
      loading: false,
    }
  },
}
</script>
