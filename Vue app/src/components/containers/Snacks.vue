<template>
    <snacks >
        <transition-group name="list" >
          <li v-for="snack in snacks" :key="snack.id" >
            <snack :snack="snack" />
          </li>
        </transition-group>
    </snacks>
</template>

<script>
import Snack from '../dumb/Snack'
import { Snacks } from '../styled/globalStyles.js'

export default {
  components: {
    Snack,
    Snacks,
  },
  computed: {
    snacks() {
      return this.$store.state.snacks
    },
  },
}
</script>
