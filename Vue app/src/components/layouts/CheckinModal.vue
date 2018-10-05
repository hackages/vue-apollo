<template>
    <modal  @close="$emit('close')"  @submit="checkin" >
        <h3 slot="header">You're going to check in to {{beer.name}}</h3>
        <div slot="body">
            <styled-form @submit="checkin">
                <label for="textarea">Write something :</label>
                <textarea id="textarea" v-model="text" ></textarea>
                <image-rating :src="beerCap" v-model="rating" :item-size="56" :show-rating="false" />
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

export default {
  props: {
    beer: {
      type: Object,
      required: true,
    },
  },
  components: {
    Modal,
    StyledForm,
    ImageRating,
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
        })
        this.$emit('close')
        this.rating = 0
        this.text = ''
      } catch (err) {
        this.snack([`Error checkin in to ${this.beer.name}`, 'error'])
      }
      this.snack([`Checked in to ${this.beer.name}`, 'success'])
    },
  },
}
</script>

<style>
</style>
