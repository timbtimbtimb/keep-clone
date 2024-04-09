<script lang="ts">
export default {
  props: {
    toggleSideMenuIsSmall: {
      type: Function,
      required: true
    },
    searchIsFocused: {
      type: Boolean,
      required: true
    },
    setSearchIsFocused: {
      type: Function,
      required: true
    }
  }
}
</script>

<template>
  <div class="TopBar">
    <ImageButton
      icon="menu"
      title="Menu"
      :handle-click="toggleSideMenuIsSmall"
    />
    <a
      class="title"
      href="/"
    >
      <img
        src="/public/logo.png"
        alt="Keep"
      >
      <h1>Keep</h1>
    </a>
    <SearchBar
      :search-is-forcused="setSearchIsFocused"
      :search-is-focused="searchIsFocused"
      :set-search-is-focused="setSearchIsFocused"
    />
    <div class="left-buttons">
      <ImageButton
        class="search-button"
        icon="search"
        title="Search"
      />
      <ImageButton
        icon="refresh"
        title="Refresh"
      />
      <ImageButton
        icon="view"
        title="View"
      />
      <ImageButton
        icon="settings"
        title="Settings"
      />
    </div>
  </div>
</template>

<style>
.TopBar {
  background-color: white;
  border-bottom: 1px solid rgb(226, 226, 226);
  width: 100vw;
  height: var(--topBar-height);
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
  padding: 0.6rem 0.75rem 0.6rem 0.75rem;
  align-items: center;
}

.TopBar .title {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  padding-right: 5rem;
  margin-left: -0.75rem;
}

.TopBar .title h1 {
  font-weight: 300;
  color: rgb(100, 100, 100);
  font-size: 1.75rem;
}

.TopBar .title img {
  height: 3rem;
}

.TopBar .left-buttons {
  display: flex;
  justify-content: end;
  flex-grow: 1;
  height: 100%;
}
</style>
