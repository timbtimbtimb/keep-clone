<script lang="ts">
import type { NoteType } from '~/components/Notes.vue'

export default {
  data () {
    return {
      notes: [] as NoteType[],
      loading: true
    }
  },
  async created () {
    await this.fetchNotes()
  },
  methods: {
    async fetchNotes () {
      const query = `
        {
          notes {
            id
            title
            content
          }
        }
      `
      try {
        const response = await fetch('http://localhost:5000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        })
        const { data: { notes } } = await response.json()
        this.notes = notes
        this.loading = false
      } catch (error) {
        console.error('Error fetching notes:', error)
      }
    },
    updateNote (data: NoteType) {
      const index = this.notes.findIndex((note) => note.id === data.id)
      if (index === -1) {
        console.error(`Could not find note: ${JSON.stringify(data)}`)
        return
      }
      this.notes[index] = {
        ...data,
        id: this.notes[index].id
      }
    },
    addNote (data: NoteType) {
      if (data.title === '' && data.content === '') {
        return
      }

      this.notes.unshift({
        ...data,
        id: Math.round(Date.now())
      })
    }
  },
}
</script>

<template>
  <div class="NotesPage">
    <TakeANote :addNote="addNote" />
    <Notes v-if="!loading" :notes="notes" :updateNote="updateNote" />
  </div>
</template>

<style>
.NotesPage {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}
</style>
