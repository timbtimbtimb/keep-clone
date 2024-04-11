<script lang="ts">
export default {
  props: {
    handleClick: {
      type: Function,
      required: false,
      default: () => {}
    },
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    class: {
      type: String,
      required: false,
      default: ''
    },
    disabled: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      className: {
        ...(this.class != null && { [this.class]: true }),
        ImageButton: true,
        disabled: this.disabled === true
      }
    }
  }
}
</script>

<template>
  <div
    :class="className"
    @click="handleClick()"
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

.ImageButton.disabled {
  opacity: 0.25;
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
