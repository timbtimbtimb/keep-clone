<script lang="ts">
import { inject } from 'vue'

export default {
  setup () {
    const tooltipState = inject('tooltipState')
    return { tooltipState }
  }
}
</script>

<template>
  <div
    v-if="tooltipState.show"
    class="Tooltip"
  >
    {{ tooltipState.text }}
  </div>
</template>

<style>
.Tooltip {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: red;
}
</style>
