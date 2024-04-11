<script lang="ts">
import { ref } from 'vue'

export interface ButtonType {
  title: string
  onClick: () => void
}

export interface TooltipMethodsType {
  setTooltip: (buttons: ButtonType[]) => void
}

export const tooltip = ref<ButtonType[]>([])

export const tooltipMethods = {
  setTooltip (buttons: ButtonType[]) {
    tooltip.value = buttons
  }
}

export default {
  provide: {
    tooltip,
    tooltipMethods
  }
}
</script>

<template>
  <div><slot /></div>
</template>
