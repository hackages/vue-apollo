import { addSnack, removeSnack } from '../database/queries'
import { sleep } from '../utils'
import { SNACK_LIFETIME } from '../constants'

export const snackMixin = {
  methods: {
    async snack([message, type = 'default']) {
      const {
        data: {
          addSnack: { id },
        },
      } = await this.$apollo.mutate({
        mutation: addSnack,
        variables: {
          type,
          message,
        },
      })
      await sleep(SNACK_LIFETIME)
      this.$apollo.mutate({
        mutation: removeSnack,
        variables: {
          id,
        },
      })
    },
  },
}
