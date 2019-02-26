<template>
  <burger-container @click="$emit('toggle')">
    <burger>
      <burger-line-right :open="opened" />
      <burger-line-middle :open="opened" />
      <burger-line-left :open="opened" />
    </burger>
  </burger-container>
</template>

<script>
import {
  BurgerContainer,
  Burger,
  BurgerLineRight,
  BurgerLineMiddle,
  BurgerLineLeft,
} from '../styled/globalStyles.js'

export default {
  components: {
    Burger,
    BurgerLineMiddle,
    BurgerContainer,
    BurgerLineRight,
    BurgerLineLeft,
  },
  props: {
    opened: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style>
</style>
