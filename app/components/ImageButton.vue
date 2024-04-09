<script lang="ts">
export default {
  props: {
    handleClick: { type: Function, default: () => {} },
    icon: { type: String, default: '' },
    title: { type: String, default: '' },
    class: { type: String, default: '' }
  },
  data () {
    return {
      className: {
        ...(this.class != null && { [this.class]: true }),
        ImageButton: true
      }
    }
  }
}
</script>

<template>
  <div
    :class="className"
    @click="handleClick && handleClick()"
  >
    <img
      :src="`/${icon}.svg`"
      :alt="title"
    >
  </div>
</template>

<style>
.ImageButton {
  border-radius: 100%;
  overflow: hidden;
  height: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.ImageButton:hover {
  border-radius: 100%;
  background-color: var(--hover-gray);
  cursor: pointer;
}

.ImageButton img {
  width: 50%;
  height: 50%;
  filter: contrast(50%);
}
</style>
