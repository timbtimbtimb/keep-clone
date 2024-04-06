<script lang="ts">
export default {
  data() {
    return {
      className: {
        [this.class]: this.class != null,
        TopBarButton: true
      }
    }
  },
  props: {
    handleClick: Function,
    icon: String,
    title: String,
    class: String
  }
}
</script>

<template>
  <div :class="this.className" @click="handleClick">
    <img :src="`/${icon}.svg`" :alt="title" />
  </div>
</template>

<style>
.TopBarButton {
  border-radius: 100%;
  height: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.TopBarButton:hover {
  border-radius: 100%;
  background-color: var(--hover-gray);
  cursor: pointer;
}

.TopBarButton img {
  filter: contrast(50%);
}
</style>