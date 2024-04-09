<script lang="ts">
import { type HTMLAttributes } from 'vue'

export default {
  props: {
    sideMenuIsSmall: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    sideMenuClass (): HTMLAttributes['class'] {
      return {
        SideMenu: true,
        small: this.sideMenuIsSmall
      }
    },
    currentPage () {
      return this.$route.path
    }
  }
}
</script>

<template>
  <div :class="sideMenuClass">
    <SideMenuButton
      :is-small="sideMenuIsSmall"
      to="/"
      icon="lightbulb"
      title="Notes"
    />
    <SideMenuButton
      :is-small="sideMenuIsSmall"
      to="/reminders"
      icon="notifications"
      title="Reminders"
    />
    <SideMenuButton
      :is-small="sideMenuIsSmall"
      to="/edit-labels"
      icon="edit"
      title="Edit labels"
    />
    <SideMenuButton
      :is-small="sideMenuIsSmall"
      to="/archive"
      icon="archive"
      title="Archive"
    />
    <SideMenuButton
      :is-small="sideMenuIsSmall"
      to="/trash"
      icon="delete"
      title="Bin"
    />
  </div>
</template>

<style>
.SideMenu {
  flex-shrink: 0;
  padding: 1rem 0 1rem 0;
  display: flex;
  flex-direction: column;
}
</style>
