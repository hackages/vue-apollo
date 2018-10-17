<template>
  <div>
    <user-provider 
      :detailed="true" 
      :history="true" 
      :id="id">
      <template slot-scope="{ user }">
        <profile-header>
          <header-container>
            <avatar 
              v-if="user.id" 
              :big="true" 
              :id="user.id" 
              class="profile-picture" />
            <text-header-container>
              <div>
                <header-username>{{ user.username }}</header-username>
                <span>joined {{ user.createdAt | ago }}</span>
              </div>
              <h3 v-if="isSelf">
                It's you!
                <span 
                  role="img" 
                  aria-label="cheers">
                  🍻
                </span>
              </h3>
              <follow-button 
                v-else 
                :is-followed="isFriend" 
                @click="follow" > {{ loading ? 'loading' : isFriend ? 'Unfollow' : 'Follow' }} </follow-button>
            </text-header-container>
          </header-container>

        </profile-header>
        <row>
          <checkin-list 
            v-if="user.check_ins" 
            :checkins="user.check_ins" />
          <user-summary :user="user" />
        </row>

      </template>
    </user-provider>
  </div>
</template>

<script>
import UserProvider from '../providers/UserProvider.vue'
import UserSummary from '../dumb/UserSummary'
import CheckinList from '../containers/CheckinList.vue'
import { follow, unfollow } from '../../database/queries.js'
import { mapActions } from 'vuex'
import Avatar from '../dumb/Avatar.vue'
import {
  ProfileHeader,
  TextHeaderContainer,
  HeaderUsername,
  FollowButton,
  Row,
  HeaderContainer,
} from '../styled/globalStyles.js'

export default {
  components: {
    UserProvider,
    HeaderUsername,
    Avatar,
    CheckinList,
    UserSummary,
    ProfileHeader,
    FollowButton,
    HeaderContainer,
    TextHeaderContainer,
    Row,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    isSelf() {
      return this.$store.state.userInfo.id === this.id
    },
    isFriend() {
      return this.$store.state.userInfo.friends.includes(this.id)
    },
  },
  methods: {
    ...mapActions(['snack']),
    async follow() {
      this.loading = true
      try {
        const {
          data: { addFriend, removeFriend },
        } = await this.$apollo.mutate({
          mutation: this.isFriend ? unfollow : follow,
          variables: {
            id: this.id,
          },
        })
        this.$store.commit('setUserInfo', addFriend || removeFriend)
        this.snack([
          this.isFriend
            ? 'Made a new friend 😃'
            : `You're no longer friends 😿`,
          'success',
        ])
      } catch (err) {
        this.snack([err.message || err, 'error'])
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
</style>
