<template>
  <users-provider>
    <template slot-scope="{ users }">
      <div 
        v-for="user in users" 
        :key="user.id"
      >
        <h1>{{ user.username }}</h1>
        <h2>{{ user.id }}</h2>
      </div>
    </template>
  </users-provider>
</template>

<script>
import UsersProvider from '../providers/UsersProvider'

export default {
  components: {
    UsersProvider,
  },
}
</script>

<style>
</style>
