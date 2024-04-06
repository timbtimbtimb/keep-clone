<script lang="ts">
import type { HTMLAttributes } from 'vue';

export default {
  props: {
    searchIsFocused: Boolean,
    setSearchIsFocused: Function
  },
  methods: {
    onBlur() {
      this.setSearchIsFocused && this.setSearchIsFocused(false)
    },
    onFocus() {
      this.setSearchIsFocused && this.setSearchIsFocused(true)
    }
  },
  computed: {
    className(): HTMLAttributes['class'] {
      return {
        search: true,
        focused: this.searchIsFocused
      };
    },
  }
}
</script>

<template>
  <div :class="className">
    <TopBarButton icon="search" title="Search" />
    <input type="text" name="search" id="search" placeholder="Search" @blur="onBlur" @focus="onFocus">
    <TopBarButton v-show="searchIsFocused" icon="close" title="Close" />
  </div>
</template>

<style>
.TopBar .search {
  display: flex;
  flex-direction: row;
  background-color: rgb(241, 243, 244);
  height: 100%;
  border-radius: 0.5rem;
  padding: 0 0.5rem 0 0.5rem;
  width: 50rem;
}

.TopBar .search.focused {
  background-color: transparent;
  box-shadow: 0px 1px 3px #b1b1b1;
}

.TopBar .search-button {
  display: none;
}

@media (max-width: 600px) {
  .TopBar .search {
    display: none;
  }

  .TopBar .search-button {
    display: flex;
  }
}

.TopBar .search input[type="text"] {
  background-color: transparent;
  border: none;
  padding: 1rem 0 1rem 0;
  font-size: 1.25rem;
  min-width: 0;
  width: 100%;
}

.TopBar .search input[type="text"]:focus {
  border: none;
}
</style>