<script lang="ts">
import type { NoteType } from '~/components/NotesList.vue'
import graphQLRequest from '~/utils/graphQLRequest'

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
      const { notes } = await graphQLRequest(query) as { notes: NoteType[] }
      this.notes = notes
      this.loading = false
    },
    async updateNote (data: NoteType) {
      const index = this.notes.findIndex((note) => note.id === data.id)
      if (index === -1) {
        console.error(`Could not find note ${data.id}`)
        return
      }

      const query = `
        mutation{
          updateNote(
            id: ${data.id}
            title: "${data.title}",
            content: "${data.content}",
          ), {
            id, title, content
          }
        }
      `

      try {
        const response = await graphQLRequest(query) as { updateNote: NoteType }
        this.notes[index] = {
          ...response.updateNote
        }
        console.log(`Updated note ${data.id}`)
      } catch (error) {
        console.error(`Failed to update note ${data.id}: ${String(error)}`)
      }
    },
    async addNote (data: NoteType) {
      if (data.title === '' && data.content === '') {
        return
      }

      const query = `
        mutation{
          addNote(
            title: "${data.title}",
            content: "${data.content}",
          ), {
            id, title, content
          }
        }
      `

      try {
        const response = await graphQLRequest(query) as { addNote: NoteType }
        this.notes.unshift({
          ...response.addNote
        })
        console.log(`Added note ${response.addNote.id}`)
      } catch (error) {
        console.error(`Failed to add note: ${String(error)}`)
      }
    }
  }
}
</script>

<template>
  <div class="NotesPage">
    <TakeANote :add-note="addNote" />
    <NotesList
      v-if="!loading"
      :notes="notes"
      :update-note="updateNote"
    />
  </div>
</template>

<style>
.NotesPage {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}
</style>
