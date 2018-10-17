<template>
  <router-link :to="`/user/${id}`" >
    <avatar-box 
      v-avatar="id" 
      :big="big" />
  </router-link>
</template>

<script>
import { AvatarBox } from '../styled/globalStyles'
export default {
  name: 'Avatar',
  components: {
    AvatarBox,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    big: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
</style>
