<script lang="ts">
export default {
  props: {
    sideMenuIsSmall: Boolean
  },
  computed: {
    sideMenuClass(): HTMLAttributes.class {
      return {
        SideMenu: true,
        small: this.sideMenuIsSmall
      };
    },
    currentPage() {
      return this.$route.path
    }
  }
}
</script>

<template>
  <div :class="sideMenuClass">
    <SideMenuButton :isSmall="sideMenuIsSmall" to="/" icon="lightbulb" title="Notes" />
    <SideMenuButton :isSmall="sideMenuIsSmall" to="/reminders" icon="notifications" title="Reminders" />
    <SideMenuButton :isSmall="sideMenuIsSmall" to="/edit-labels" icon="edit" title="Edit labels" />
    <SideMenuButton :isSmall="sideMenuIsSmall" to="/archive" icon="archive" title="Archive" />
    <SideMenuButton :isSmall="sideMenuIsSmall" to="/trash" icon="delete" title="Bin" />
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