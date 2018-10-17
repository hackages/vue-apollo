<template>
  <beers-container>
    <beer-provider 
      v-for="num in 6" 
      :key="num">
      <beer-item 
        slot-scope="slotProps" 
        :beer="slotProps.beer" />
    </beer-provider>
  </beers-container>
</template>

<script>
import BeerProvider from '../providers/BeerProvider.vue'
import BeerItem from '../dumb/BeerItem.vue'
import { BeersContainer } from '../styled/globalStyles.js'

export default {
  components: {
    BeerProvider,
    BeerItem,
    BeersContainer,
  },
}
</script>
