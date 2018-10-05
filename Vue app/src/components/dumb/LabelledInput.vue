<template>
    <input-container>
        <styled-label :focus="isfocus" :for="id">{{ label }}</styled-label>
        <styled-input
                :focus="isfocus"
                @focus.native="toggleFocus($event)"
                @blur.native="toggleFocus($event)"
                v-bind:value="value"
                v-on:input="$emit('input',$event)"
                :id="id"
                :type="type"
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
  props: ['id', 'value', 'type', 'label'],
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
