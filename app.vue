<script lang="ts">
export default {
  data() {
    return {
      sideMenuIsSmall: false,
      searchIsFocused: false
    }
  },
  methods: {
    toggleSideMenuIsSmall(): void {
      this.sideMenuIsSmall = !this.sideMenuIsSmall
    },
    setSearchIsFocused(bool: boolean) {
      console.log('searchIsFocused', bool)
    }
  },
  computed: {
    sideMenuClass() {
      return {
        SideMenu: true,
        small: this.sideMenuIsSmall
      };
    }
  }
}
</script>

<template>
  <div class="main">
    <TopBar :sideMenuIsSmall="sideMenuIsSmall" :toggleSideMenuIsSmall="toggleSideMenuIsSmall"
      :setSearchIsFocused="setSearchIsFocused" />
    <div class="Contents">
      <SideMenu :sideMenuIsSmall="sideMenuIsSmall" />
      <NuxtPage />
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;

  font-size: 13px;

  --topBar-height: 5rem;
  --hover-gray: rgb(240, 240, 240);

  font-family: sans-serif;

  text-decoration: none;
}

html,
body,
.main {
  width: 100vw;
  height: 100vh;
}

.Contents {
  flex-direction: row;
  display: flex;
  height: calc(100% - var(--topBar-height))
}
</style>