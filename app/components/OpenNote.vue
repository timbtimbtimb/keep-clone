<script lang="ts">
import { inject } from 'vue'

export default {
  props: {
    note: {
      type: Object,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    },
    size: {
      type: Array,
      required: true
    },
    animationDuration: {
      type: Number,
      required: true
    },
    parentRef: {
      type: Object,
      required: true
    },
    updateNote: {
      type: Function,
      required: true
    }
  },
  setup () {
    const tooltipMethods = inject('tooltipMethods') as null | { showTooltip: () => void, hideTooltip: () => void }
    if (tooltipMethods == null) {
      return
    }
    const { showTooltip, hideTooltip } = tooltipMethods
    return { showTooltip, hideTooltip }
  },
  data () {
    return {
      title: this.note.title as string,
      content: this.note.content as string,
      backroundColor: false,
      animationPending: false,
      animatedFrameStyle: {}
    }
  },
  computed: {
    openNoteContainerClass () {
      return {
        OpenNote: true,
        visible: this.backroundColor,
        'not-moving': !this.animationPending
      }
    },
    showDeleteTooltip () {
      return () => this.showTooltip('Delete')
    }
  },
  mounted () {
    this.openAnimation()
  },
  methods: {
    setAnimatedFrame (parent: HTMLElement) {
      const { top, left, width, height } = parent.getBoundingClientRect()

      this.animatedFrameStyle = {
        top: `${top}px`,
        right: `calc(100% - ${left + width}px`,
        bottom: `calc(100% - ${top + height}px`,
        left: `${left}px`
      }
    },
    async openAnimation () {
      if (this.animationPending) {
        return
      }

      this.animationPending = true
      const parent = this.parentRef as HTMLElement | undefined
      const animatedFrame = this.$refs.animatedFrame as HTMLElement | undefined
      if (animatedFrame == null || parent == null) {
        return
      }

      await this.$nextTick()

      this.setAnimatedFrame(parent)

      setTimeout(
        () => {
          const animatedFrame = this.$refs.animatedFrame as HTMLElement | undefined
          if (animatedFrame == null) {
            return
          }
          this.animatedFrameStyle = {}
          this.backroundColor = true
          animatedFrame.style.transitionDuration = `${this.animationDuration}ms`
        },
        0
      )

      setTimeout(
        () => {
          this.animationPending = false
        }
        , this.animationDuration)
    },
    handleCloseClick (event: MouseEvent) {
      if (event.target !== this.$refs.noteRef) {
        return
      }
      this.closeAnimation()
    },
    closeAnimation () {
      this.animationPending = true
      const parent = this.parentRef as HTMLElement | undefined
      const animatedFrame = this.$refs.animatedFrame as HTMLElement | undefined
      if (animatedFrame == null || parent == null) {
        return
      }

      this.setAnimatedFrame(parent)
      this.backroundColor = false

      this.updateNote({
        ...this.note,
        title: this.title,
        content: this.content
      })

      setTimeout(() => {
        this.onClose?.()
        this.animationPending = false
      }, this.animationDuration)
    }
  }
}
</script>

<template>
  <div
    ref="noteRef"
    :class="openNoteContainerClass"
    @pointerdown="handleCloseClick"
  >
    <div
      ref="animatedFrame"
      class="animated-frame"
      :style="animatedFrameStyle"
    >
      <div
        v-if="!animationPending"
        class="content-container"
      >
        <input
          v-model="title"
          type="text"
        >
        <textarea v-model="content" />
        <div class="buttons">
          <ImageButton
            icon="add-alert"
            title="New list"
          />
          <ImageButton
            icon="add-person"
            title="New list"
          />
          <ImageButton
            icon="palette"
            title="New note with drawing"
          />
          <ImageButton
            icon="archive"
            title="New note with image"
          />
          <ImageButton
            icon="vertical-dots"
            title="New note with image"
            @click="showDeleteTooltip"
          />
          <ImageButton
            icon="undo"
            title="New note with image"
          />
          <ImageButton
            icon="redo"
            title="New note with image"
          />
          <button @click="closeAnimation">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.OpenNote {
  position: fixed;
  background-color: rgba(0, 0, 0, 0);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition-property: background-color;
  transition-duration: 300ms;
  z-index: 1;
  opacity: 1;
}

.OpenNote.visible {
  background-color: rgba(0, 0, 0, 0.5);
}

.OpenNote .animated-frame {
  position: absolute;
  transition-property: all;
  z-index: 4;
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 0.8rem;
  padding: 1rem 1rem 1rem 1rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  overflow: hidden;
  top: 25%;
  bottom: 25%;
  right: 25%;
  left: 25%;
}

.OpenNote.not-moving .animated-frame {
  top: 25% !important;
  bottom: 25% !important;
  left: 25% !important;
  right: 25% !important;
}

.OpenNote .content-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.OpenNote input[type="text"] {
  font-size: 1.5rem;
  font-weight: normal;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  border: none;
}

.OpenNote textarea {
  font-size: 1.1rem;
  border: none;
  resize: none;
  width: 100%;
  flex-grow: 1;
}

.OpenNote .buttons {
  flex-shrink: 0;
  align-items: center;
  height: 2.5rem;
  padding: 0;
  display: flex;
  transition-property: opacity;
  transition-duration: 300ms;
  justify-content: space-between;
}

.OpenNote .buttons button {
  text-align: right;
  font-size: 1.1rem;
  font-weight: 600;
  color: rgb(75, 75, 75);
  border-radius: 3px;
  text-align: center;
  padding: 0.75rem 2rem 0.75rem 2rem;
  margin-left: auto;
  cursor: pointer;
  flex-shrink: 0;
}

.OpenNote .buttons button:hover {
  background-color: var(--hover-gray)
}
</style>
