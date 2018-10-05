<template>
    <div>
        <slot :user="user" >
        </slot>
    </div>
</template>

<script>
import { getUser } from '../../database/queries.js'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    detailed: {
      type: Boolean,
      required: false,
      default: false,
    },
    history: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      user: {},
    }
  },
  apollo: {
    user: {
      query: getUser,
      variables() {
        return {
          detailed: this.detailed,
          id: this.id,
          history: this.history,
        }
      },
      fetchPolicy: 'cache-and-network',
    },
  },
}
</script>

<style>
</style>
