<template>
  <div>
    <UserProvider 
      v-for="id in ids" 
      :key="id" 
      :id="id" 
      :history="true" 
      class="item" >
      <template slot-scope="props" >
        <UserSummary 
          v-if="props.user" 
          :user="props.user" />
      </template>
    </UserProvider>
  </div>
</template>

<script>
import UserProvider from '../providers/UserProvider'
import UserSummary from '../dumb/UserSummary'

export default {
  components: {
    UserProvider,
    UserSummary,
  },
  props: {
    ids: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>

<style>
.item {
  display: inline-block;
}
</style>
