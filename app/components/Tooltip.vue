<script lang="ts">
import { inject } from 'vue'
import type { TooltipType, SetTooltipType } from './TooltipProvider.vue'

export default {
  setup () {
    const tooltip = inject('tooltip') as TooltipType
    const setTooltip = inject('setTooltip') as SetTooltipType
    return { tooltip, setTooltip }
  },
  computed: {
    style () {
      const { top, left } = this.tooltip.position
      return {
        top: `${top}px`,
        left: `${left}px`
      }
    }
  },
  mounted () {
    document.addEventListener('pointerdown', this.handleClickOutside)
  },
  beforeUnmount () {
    document.removeEventListener('pointerdown', this.handleClickOutside)
  },
  methods: {
    handleClickOutside (event: MouseEvent) {
      event.preventDefault()
      event.stopPropagation()
      const parentRef = this.$refs.parent as HTMLElement | undefined
      if (parentRef != null && !parentRef.contains(event.target as HTMLElement)) {
        this.setTooltip({
          position: { top: 0, left: 0 },
          buttons: []
        })
      }
    }
  }
}
</script>

<template>
  <ul
    ref="parent"
    class="Tooltip"
    :style="style"
  >
    <li
      v-for="(button, index) in tooltip.buttons"
      :key="index"
    >
      {{ button.title }}
    </li>
  </ul>
</template>

<style>
.Tooltip {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: white;
  box-shadow: 0px 1px 3px #b1b1b1;
  padding: 0.5rem 0 0.5rem 0;
  border-radius: 3px;
  list-style: none;
}

.Tooltip>li{
  line-height: 2rem;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0 1rem 0 1rem;
}

.Tooltip>li:hover{
  background-color: #f0f0f0;
}
</style>
