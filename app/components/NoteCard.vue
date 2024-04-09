<script lang="ts">
import type { NoteType } from './NotesList.vue'

export default {
  props: {
    note: {
      type: Object as () => NoteType,
      required: true
    },
    updateNote: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      backroundColor: false,
      isOpen: false
    }
  },
  computed: {
    noteClass () {
      return {
        NoteCard: true,
        openned: this.isOpen
      }
    },
    openWindowSize () {
      return [
        window.innerWidth / 2,
        window.innerHeight / 2
      ]
    }
  },
  methods: {
    open () {
      this.isOpen = true
    },
    onClose () {
      this.isOpen = false
    },
    formatContent (content: string) {
      return content.replaceAll(/\n/g, '<br>')
    }
  }
}
</script>

<template>
  <OpenNote
    v-if="isOpen"
    :parent-ref="$refs.parent"
    :on-close="onClose"
    :note="note"
    :content="note.content"
    :animation-duration="300"
    :size="openWindowSize"
    :update-note="updateNote"
  />
  <div :class="noteClass">
    <div ref="parent">
      <div
        class="content"
        @click="open"
      >
        <h1>{{ note.title }}</h1>
        <p v-html="formatContent(note.content)" />
      </div>
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
          floating-button="Delete"
        />
      </div>
    </div>
  </div>
</template>

<style>
.NoteCard {
  padding: 0.5rem;
  cursor: default;
  user-select: none;
}

.NoteCard>div {
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 0.8rem;
  padding: 1rem 1rem 1rem 1rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.NoteCard.openned {
  opacity: 0;
}

.NoteCard:hover>div {
  box-shadow: 0px 1px 3px #b1b1b1;
}

.NoteCard h1 {
  font-size: 1.5rem;
  font-weight: normal;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.NoteCard p {
  font-size: 1.1rem;
}

.NoteCard .content {
  flex-grow: 1;
  gap: 1rem;
  display: flex;
  flex-direction: column;
}

.NoteCard .buttons {
  flex-shrink: 0;
  align-items: center;
  height: 2.5rem;
  padding: 0;
  display: flex;
  opacity: 0;
  transition-property: opacity;
  transition-duration: 300ms;
  justify-content: space-between;
}

.NoteCard:hover .buttons {
  opacity: 1;
}

.NoteCard .buttons button {
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

.NoteCard .buttons button:hover {
  background-color: var(--hover-gray)
}
</style>
