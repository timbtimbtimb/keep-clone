<script lang="ts">
import { ref } from 'vue'

export interface ButtonType {
  title: string
  onClick: () => void
}

export interface TooltipType {
  buttons: ButtonType[]
  position: { top: number, left: number }
}

export type SetTooltipType = (data: TooltipType) => void

export const tooltip = ref<TooltipType>({
  buttons: [],
  position: { top: 0, left: 0 }
})

export const setTooltip: SetTooltipType = ({ buttons, position }) => {
  tooltip.value = {
    buttons,
    position
  }
}

export default {
  provide: {
    tooltip,
    setTooltip
  },
  computed: {
    tooltipVisible () {
      return tooltip.value.buttons.length > 0
    }
  }
}
</script>

<template>
  <div ref="parent">
    <Tooltip v-if="tooltipVisible" />
    <slot />
  </div>
</template>
