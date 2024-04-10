<script lang="ts">
import { ref } from 'vue'

export const tooltipState = ref({
  show: false,
  text: ''
})

export const tooltipMethods = {
  showTooltip (text) {
    tooltipState.value.show = true
    tooltipState.value.text = text
  },
  hideTooltip () {
    console.log('hideTooltip')
    tooltipState.value.show = false
    tooltipState.value.text = ''
  }
}

export default {
  provide: {
    tooltipState,
    tooltipMethods
  }
}
</script>

<template>
  <div><slot></slot></div>
</template>
