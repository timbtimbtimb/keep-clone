<script lang="ts">
export default {
  data () {
    return {
      sideMenuIsSmall: false,
      searchIsFocused: false
    }
  },
  computed: {
    sideMenuClass () {
      return {
        SideMenu: true,
        small: this.sideMenuIsSmall
      }
    }
  },
  methods: {
    toggleSideMenuIsSmall (): void {
      this.sideMenuIsSmall = !this.sideMenuIsSmall as boolean
    },
    setSearchIsFocused (bool: boolean) {
      this.searchIsFocused = bool
    }
  }
}
</script>

<template>
  <div class="main">
    <TopBar
      :side-menu-is-small="sideMenuIsSmall"
      :toggle-side-menu-is-small="toggleSideMenuIsSmall"
      :set-search-is-focused="setSearchIsFocused"
      :search-is-focused="searchIsFocused"
    />
    <div class="Contents">
      <SideMenu :side-menu-is-small="sideMenuIsSmall" />
      <NuxtPage class="Page" />
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

button {
  border: none;
  background-color: transparent;
}

html,
body,
.main {
  width: 100vw;
  height: 100vh;
}

html {
  overflow-x: hidden;
}

.Contents {
  flex-direction: row;
  display: flex;
  height: calc(100% - var(--topBar-height))
}

.Page {
  width: 100%;
  padding: 3rem;
  min-height: 100%;
}
</style>
