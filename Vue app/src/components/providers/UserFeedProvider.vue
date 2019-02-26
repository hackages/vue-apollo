<template>
  <div>
    <slot :checkins="userFeed" />
  </div>
</template>

<script>
import {
  getUserFeed,
  checkinSubscription,
  getUserInfo,
} from '../../database/queries.js'
import { snackMixin } from '../../mixins/snacks.js'

export default {
  props: {
    limit: {
      type: Number,
      default: 18,
    },
  },
  data() {
    return {
      userFeed: [],
    }
  },
  mixin: [snackMixin],
  apollo: {
    userInfo: {
      query: getUserInfo,
    },
    userFeed: {
      query: getUserFeed,
      fetchPolicy: 'cache-and-network',
      variables() {
        return {
          limit: this.limit,
        }
      },
      error(err) {
        this.snack([err.message || err, 'error'])
      },
      subscribeToMore: {
        document: checkinSubscription,
        updateQuery(
          { userFeed },
          {
            subscriptionData: {
              data: { checkinAdded },
            },
          }
        ) {
          const {
            user: { id: checkId },
          } = checkinAdded
          const { friends, id: ownId } = this.userInfo
          const inFriendList = [...friends, ownId].includes(checkId)
          inFriendList &&
            checkId !== ownId &&
            this.snack([
              `${checkinAdded.user.username} checked in to ${
                checkinAdded.beer.name
              }`,
              'success',
            ])
          // only update with own or friend's checkins
          return {
            userFeed: inFriendList ? [checkinAdded, ...userFeed] : userFeed,
          }
        },
        variables() {
          return {
            onlyBeers: false,
          }
        },
        error(err) {
          this.snack([err.message || err, 'error'])
        },
      },
    },
  },
}
</script>

<style>
</style>
