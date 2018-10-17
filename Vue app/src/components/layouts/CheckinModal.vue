<template>
  <modal 
    @close="$emit('close')" 
    @submit="checkin" >
    <h3 slot="header">You're going to check in to {{ beer.name }}</h3>
    <div slot="body">
      <styled-form @submit="checkin">
        <label for="textarea">Write something :</label>
        <textarea 
          id="textarea" 
          v-model="text" />
        <image-rating 
          :src="beerCap" 
          v-model="rating" 
          :item-size="56" 
          :show-rating="false" />
      </styled-form>
    </div>
  </modal>
</template>

<script>
import { checkIn } from '../../database/queries.js'
import { ImageRating } from 'vue-rate-it'
import { mapActions } from 'vuex'
import HackBeer from '../../assets/img/hackbeer.svg'
import { StyledForm } from '../styled/globalStyles.js'
import Modal from '../containers/Modal.vue'
import { updateBeerCacheWithCheckin } from '../../utils.js'

export default {
  components: {
    Modal,
    StyledForm,
    ImageRating,
  },
  props: {
    beer: {
      type: Object,
      required: true,
    },
    updateAfterCheckin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      text: '',
      rating: 0,
      beerCap: HackBeer,
    }
  },
  methods: {
    ...mapActions(['snack']),
    async checkin() {
      const info = {
        beer: this.beer.id,
        rating: this.rating,
        text: this.text,
      }
      try {
        await this.$apollo.mutate({
          mutation: checkIn,
          variables: info,
          update: (store, { data: { createCheckin } }) => {
            this.updateAfterCheckin &&
              updateBeerCacheWithCheckin(
                store,
                this.beer.id.toString(),
                createCheckin
              )
          },
        })
        this.snack([`Checked in to ${this.beer.name}`, 'success'])
        this.rating = 0
        this.text = ''
      } catch (err) {
        this.snack([`Error checkin in to ${this.beer.name}`, 'error'])
      }
      this.$emit('close')
    },
  },
}
</script>

<style>
</style>
