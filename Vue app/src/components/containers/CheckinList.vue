<template>
    <column>
        <rated-beer v-for="checkin in checkins" :key="checkin.id" >
            <checkin-item :checkin="checkin" />
        </rated-beer>
    </column>
</template>

<script>
import CheckinItem from '../dumb/CheckinItem'
import { Column, RatedBeer } from '../styled/globalStyles'

export default {
  props: {
    checkins: {
      type: Array,
      required: true,
    },
  },
  components: {
    CheckinItem,
    Column,
    RatedBeer,
  },
}
</script>
