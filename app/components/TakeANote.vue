<script lang="ts">
import type { HTMLAttributes } from 'vue'

export default {
  props: {
    onContentChange: Function,
    onTitleChange: Function
  },
  data () {
    return {
      focused: false,
      title: '',
      content: ''
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    handleClickOutside(event: MouseEvent) {
      const parentRef = this.$refs.parent as HTMLElement | undefined
      if (parentRef != null && !parentRef.contains(event.target as HTMLElement)) {
        this.onClose()
      }
    },
    onFocus () {
      this.focused = true
    },
    onClose () {
      this.focused = false
      this.title = ''
      this.content = ''
    },
    onContentInput ({ target }: Event) {
      if (target instanceof HTMLTextAreaElement) {
        this.onContentChange != null && this.onContentChange(target.value)
      }
    },
    onTitleInput ({ target }: Event) {
      if (target instanceof HTMLTextAreaElement) {
        this.onTitleChange != null && this.onTitleChange(target.value)
      }
    }
  },
  computed: {
    className (): HTMLAttributes['class'] {
      return {
        TakeANote: true,
        focused: this.focused,
        'has-content': this.content != ''
      }
    },
  }
}
</script>

<template>
  <div :class="className" ref="parent">
    <div class="title">
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        v-model="title"
        @input="onContentInput" />
      <ImageButton icon="pin" title="Pin" />
    </div>
    <div class="content">
      <textarea
        name="content"
        id="content"
        v-model="content"
        placeholder="Take a note..."
        @focus="onFocus"
        @input="onContentInput"></textarea>
      <ImageButton v-show="!focused" icon="checked" title="New list" />
      <ImageButton v-show="!focused" icon="paint" title="New note with drawing" />
      <ImageButton v-show="!focused" icon="image" title="New note with image" />
    </div>
    <div class="buttons">
      <ImageButton icon="add-alert" title="New list" />
      <ImageButton icon="add-person" title="New list" />
      <ImageButton icon="palette" title="New note with drawing" />
      <ImageButton icon="archive" title="New note with image" />
      <ImageButton icon="vertical-dots" title="New note with image" />
      <ImageButton icon="undo" title="New note with image" />
      <ImageButton icon="redo" title="New note with image" />
      <button @click="onClose">Close</button>
    </div>
  </div>
</template>

<style>
.TakeANote {
  display: flex;
  flex-direction: column;
  background-color: transparent;
  box-shadow: 0px 2px 6px #b1b1b1;
  border-radius: 0.5rem;
  max-width: 50rem;
  width: 100%;
  margin: 0 auto 0 auto;
}

.TakeANote.focused {
  box-shadow: 0px 2px 6px #808080;
}

.TakeANote>div {
  height: 3.5rem;
  padding: 0 1rem 0 1rem
}

.TakeANote img {
  filter: contrast(0);
}

.TakeANote textarea,
.TakeANote input[type="text"] {
  border: none;
  flex-grow: 1;
  background-color: transparent;
  border: none;
  font-size: 1.25rem;
  min-width: 0;
  width: 100%;
  font-weight: bold
}

.TakeANote .title {
  display: flex;
  flex-direction: row;
  align-items: center;
  display: none;
}

.TakeANote .title input[type="text"] {
  padding: 0;
}

.TakeANote.focused .title {
  display: inherit;
}

.TakeANote .content {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
}

.TakeANote .content textarea {
  height: 100%;
  resize: none;
  padding: 0.5rem;
  line-height: 2.5rem;
  overflow: hidden;
}

.TakeANote.focused .content textarea {
  font-size: 1.1rem;
  line-height: inherit;
}

.TakeANote.has-content .content textarea {
  font-size: 1.1rem;
  font-weight: normal;
}

.TakeANote .buttons {
  display: none;
  gap: 2rem;
  align-items: center;
  padding-bottom: 0.25rem;
}

.TakeANote .buttons button {
  text-align: right;
  font-size: 1.1rem;
  font-weight: 600;
  color: rgb(75, 75, 75);
  border-radius: 3px;
  text-align: center;
  padding: 0.75rem 2rem 0.75rem 2rem;
  margin-left: auto;
  cursor: pointer;
}

.TakeANote .buttons button:hover {
  background-color: var(--hover-gray)
}

.TakeANote.focused .buttons {
  display: flex;
}
</style>