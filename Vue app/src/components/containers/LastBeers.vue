<template>
        <checkins-provider :onlyBeers="true" :limit="12" >
            <template slot-scope="slotProps">
                <padding-container>
                    <display-beers :beers="slotProps.beers" />
                </padding-container>
            </template>
        </checkins-provider>
</template>

<script>
import CheckinsProvider from '../providers/CheckinsProvider.vue'
import DisplayBeers from '../containers/DisplayBeers.vue'
import { PaddingContainer } from '../styled/globalStyles.js'
export default {
  components: {
    CheckinsProvider,
    DisplayBeers,
    PaddingContainer,
  },
}
</script>

<style scoped>
</style>
