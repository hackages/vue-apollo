<template>
  <transition name="modal">
    <styled-modal>
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button 
                class="modal-default-button button-close" 
                @click="$emit('close')"
              >
                cancel
              </button>
              <button 
                class="modal-default-button button-submit" 
                @click="$emit('submit')"
              >
                submit
              </button>
            </slot>
          </div>
        </div>
      </div>
    </styled-modal>
  </transition>
</template>

<script>
import { StyledModal } from '../styled/globalStyles.js'

export default {
  components: {
    StyledModal,
  },
}
</script>
