<template>
  <sidebar-infos 
    v-if="user.beer_history" 
    class="user-summary"
  >
    <sidebar-infos-box>
      <infos-bold>
        {{ user.beer_history.beersHad }}
      </infos-bold>
      beers had
    </sidebar-infos-box>

    <sidebar-infos-box>
      <infos-bold>
        {{ user.beer_history.uniqueBeersHad }}
      </infos-bold>
      unique beers had
    </sidebar-infos-box>

    <sidebar-infos-box>
      <infos-bold>
        {{ user.beer_history.averageRating }}
      </infos-bold>
      average rating
    </sidebar-infos-box>

    <sidebar-infos-box>
      <infos-bold>
        {{ user.friends.length }}
      </infos-bold>
      follows 
    </sidebar-infos-box>
  </sidebar-infos>
</template>

<script>
import {
  SidebarInfosBox,
  SidebarInfos,
  InfosBold,
} from '../styled/globalStyles.js'
export default {
  components: {
    SidebarInfos,
    SidebarInfosBox,
    InfosBold,
  },
  props: {
    user: {
      required: true,
      type: Object,
    },
  },
}
</script>
