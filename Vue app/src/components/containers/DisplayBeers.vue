<script>
import BeerItem from '../dumb/BeerItem.vue'
import { BeersContainer } from '../styled/globalStyles.js'
export default {
  functional: true,
  props: {
    beers: {
      type: Array,
      required: true,
    },
  },
  render(
    h,
    {
      props: { beers },
    }
  ) {
    return (
      <BeersContainer>
        {beers.map(beer => <BeerItem beer={beer} />)}
      </BeersContainer>
    )
  },
}
</script>

<style>
</style>
