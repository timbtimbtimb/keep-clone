<script lang="ts">
import type { HTMLAttributes } from 'vue'

export default {
  props: {
    to: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    isSmall: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    currentPage (): string {
      return this.$route.path
    },
    className (): HTMLAttributes['class'] {
      return {
        SideMenuButton: true,
        active: this.currentPage === this.to && 'active',
        small: this.isSmall
      }
    }
  }
}
</script>

<template>
  <NuxtLink
    :to="to"
    :class="className"
  >
    <img
      :src="`/${icon}.svg`"
      :alt="title"
    >
    <span>{{ title }}</span>
  </NuxtLink>
</template>

<style>
.SideMenuButton {
  width: 21rem;
  height: 4rem;
  border-top-right-radius: 4rem;
  border-bottom-right-radius: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2.5rem;
  padding: 0 2rem 0 2rem;
  cursor: pointer;
  transition-property: border-radius, width, padding, margin;
  transition-duration: 300ms;
}

.SideMenuButton.small {
  border-radius: 100%;
  width: 4rem;
  margin: 0 1rem 0 1rem;
  padding: 1rem;
}

.SideMenuButton:hover {
  background-color: var(--hover-gray);
}

.SideMenuButton.active {
  background-color: #feefc3;
}

.SideMenuButton span {
  font-size: 1rem;
  font-weight: 600;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  color: rgb(50, 50, 50);
  white-space: nowrap;
}

.SideMenuButton img {
  filter: contrast(50%);
}
</style>
