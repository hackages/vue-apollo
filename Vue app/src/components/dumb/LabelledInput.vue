<template>
  <input-container>
    <styled-label 
      :focus="isfocus" 
      :for="id">{{ label }}</styled-label>
    <styled-input
      :focus="isfocus"
      :value="value"
      :id="id"
      :type="type"
      @focus.native="toggleFocus($event)"
      @blur.native="toggleFocus($event)"
      @input="$emit('input',$event)"
    />
  </input-container>
</template>

<script>
import {
  InputContainer,
  StyledInput,
  StyledLabel,
} from '../styled/globalStyles.js'

export default {
  name: 'LabelledInput',
  components: {
    InputContainer,
    StyledInput,
    StyledLabel,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isfocus: false,
    }
  },
  methods: {
    toggleFocus(event) {
      if (event.target.value) {
        this.focus = true
      } else {
        this.isfocus = !this.isfocus
      }
    },
  },
}
</script>

<style scoped>
</style>
