<template>
  <snack>
    <snack-content>
      <h4>{{ snack.type }}</h4>
      <p>{{ snack.message }}</p>
    </snack-content>
    <snack-dismiss
      class="dismiss"
      @click="clearSnack(snack.id)"
    >
      DISMISS
    </snack-dismiss>
    <snack-loader :duration="duration">
      <div>{{ ' ' }}</div>
    </snack-loader>
  </snack>
</template>

<script>
import { SNACK_LIFETIME } from '../../constants.js'
import {
  Snack,
  SnackContent,
  SnackLoader,
  SnackDismiss,
} from '../styled/globalStyles.js'
import { removeSnack } from '../../database/queries.js'

export default {
  components: {
    Snack,
    SnackContent,
    SnackLoader,
    SnackDismiss,
  },
  props: {
    snack: {
      type: Object,
      required: true,
    },
  },
  computed: {
    duration() {
      return SNACK_LIFETIME
    },
  },
  methods: {
    clearSnack(id) {
      this.$apollo.mutate({
        mutation: removeSnack,
        variables: {
          id,
        },
      })
    },
  },
}
</script>
