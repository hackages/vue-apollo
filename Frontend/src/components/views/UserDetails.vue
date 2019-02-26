<template>
  <div>
    <user-provider
      :id="id"
      :detailed="true"
      :history="true"
    >
      <template slot-scope="{ user }">
        <profile-header>
          <header-container>
            <avatar
              v-if="user.id"
              :id="user.id"
              :big="true"
              class="profile-picture"
            />
            <text-header-container>
              <div>
                <header-username>{{ user.username }}</header-username>
                <span>joined {{ user.createdAt | ago }}</span>
              </div>
              <h3 v-if="isSelf">
                It's you!
                <span
                  role="img"
                  aria-label="cheers"
                >
                  🍻
                </span>
              </h3>
              <follow-button
                v-else
                :is-followed="isFriend"
                @click="follow"
              >
                {{ loading ? 'loading' : isFriend ? 'Unfollow' : 'Follow' }}
              </follow-button>
            </text-header-container>
          </header-container>
        </profile-header>
        <row>
          <checkin-list
            v-if="user.check_ins"
            :checkins="user.check_ins"
          />
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
import {
  follow,
  unfollow,
  getUserInfo,
  updateUser,
} from '../../database/queries.js'
import Avatar from '../dumb/Avatar.vue'
import {
  ProfileHeader,
  TextHeaderContainer,
  HeaderUsername,
  FollowButton,
  Row,
  HeaderContainer,
} from '../styled/globalStyles.js'
import { snackMixin } from '../../mixins/snacks'
import { sleep } from '../../utils'

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
  mixins: [snackMixin],
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
      return this.userInfo && this.userInfo.id === this.id
    },
    isFriend() {
      return (
        this.userInfo &&
        !!this.userInfo.friends.find(friend => friend.id === this.id)
      )
    },
  },
  apollo: {
    userInfo: {
      query: getUserInfo,
      fetchPolicy: 'cache-and-network',
    },
  },
  methods: {
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
        this.$apollo.mutate({
          mutation: updateUser,
          variables: {
            userInfo: addFriend || removeFriend,
          },
        })
        await sleep(0.7)
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
