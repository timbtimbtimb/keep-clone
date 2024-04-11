<script lang="ts">
import { inject } from 'vue'
import type { ButtonType } from './TooltipProvider.vue'

export default {
  setup () {
    const tooltip = inject('tooltip') as ButtonType[]
    return { tooltip }
  }
}
</script>

<template>
  <ul
    v-if="tooltip.length > 0"
    class="Tooltip"
  >
    <li
      v-for="(button, index) in tooltip"
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
