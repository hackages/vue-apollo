<template>
  <column>
    <rated-beer 
      v-for="checkin in checkins" 
      :key="checkin.id"
    >
      <checkin-item :checkin="checkin" />
    </rated-beer>
  </column>
</template>

<script>
import CheckinItem from '../dumb/CheckinItem'
import { Column, RatedBeer } from '../styled/globalStyles'

export default {
  components: {
    CheckinItem,
    Column,
    RatedBeer,
  },
  props: {
    checkins: {
      type: Array,
      required: true,
    },
  },
}
</script>
