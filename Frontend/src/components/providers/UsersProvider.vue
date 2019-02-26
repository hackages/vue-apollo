<template>
  <div>
    <slot :users="users" />
  </div>
</template>

<script>
import { getAllUsers } from '../../database/queries.js'

export default {
  props: {
    limit: {
      type: Number,
      required: false,
      default: 999,
    },
  },
  apollo: {
    users: {
      query: getAllUsers,
      variables() {
        return {
          limit: this.limit,
        }
      },
      fetchPolicy: 'cache-and-network',
    },
  },
}
</script>
