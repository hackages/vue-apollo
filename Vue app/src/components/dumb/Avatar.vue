<template>
    <router-link :to="`/user/${id}`" >
        <avatar-box :big="big" v-avatar="id" ></avatar-box>
    </router-link>
</template>

<script>
import { AvatarBox } from '../styled/globalStyles'
export default {
  name: 'Avatar',
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
  components: {
    AvatarBox,
  },
}
</script>

<style scoped>
</style>
