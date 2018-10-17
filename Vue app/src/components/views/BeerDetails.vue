<template>
  <div>
    <beer-provider 
      :detailed="true" 
      :id="id">
      <template slot-scope="{ beer }">
        <profile-header>
          <header-container>
            <image-container :checkin="true">
              <div v-background="beer.image_url"/>
            </image-container>

            <text-header-container>
              <header-username>{{ beer.name }}</header-username>
              <h4>{{ beer.tagline }}</h4>
              <p>{{ beer.description }}</p>
              <styled-button 
                :little="true" 
                @click="showModal = true" >check in</styled-button>
            </text-header-container>
          </header-container>
        </profile-header>


        <div 
          v-if="beer.check_ins" 
          class="lastUsers">
          <h4>Last checked by</h4>
          <row>
            <column>
              <li 
                v-for="checkin in beer.check_ins" 
                :key="checkin.id" >
                <checkin-item :checkin="checkin" />
              </li>
            </column>

            <sidebar-infos>
              <sidebar-infos-box>
                <infos-bold>
                  {{ beer.average }}
                </infos-bold>
                Average rating
              </sidebar-infos-box>
              <sidebar-infos-box>
                <infos-bold>
                  {{ beer.ibu }}
                </infos-bold>
                IBU
              </sidebar-infos-box>
              <sidebar-infos-box>
                <infos-bold>
                  {{ beer.abv }}
                </infos-bold>
                ABV
              </sidebar-infos-box>
              <sidebar-infos-box>
                <infos-bold>
                  nope
                </infos-bold>
                loyal drinker
              </sidebar-infos-box>
            </sidebar-infos>
          </row>
        </div>

        <template v-if="showModal" >
          <checkin-modal 
            :update-after-checkin="true" 
            :beer="beer" 
            @close="showModal = false" />
        </template>

      </template>
    </beer-provider>
  </div>
</template>

<script>
import BeerProvider from '../providers/BeerProvider'
import CheckinItem from '../dumb/CheckinItem'
import {
  ImageContainer,
  ProfileHeader,
  HeaderContainer,
  HeaderUsername,
  Column,
  SidebarInfos,
  StyledButton,
  SidebarInfosBox,
  InfosBold,
  TextHeaderContainer,
  Row,
} from '../styled/globalStyles'

export default {
  components: {
    ImageContainer,
    BeerProvider,
    CheckinItem,
    SidebarInfos,
    SidebarInfosBox,
    ProfileHeader,
    HeaderContainer,
    HeaderUsername,
    TextHeaderContainer,
    InfosBold,
    StyledButton,
    Column,
    Row,
    CheckinModal: () => import('../layouts/CheckinModal'),
  },
  props: {
    id: {
      type: String,
      default: null,
      required: false,
    },
  },
  data() {
    return {
      showModal: false,
    }
  },
}
</script>

<style scoped>
li {
  display: inline-block;
  vertical-align: top;
}
</style>
