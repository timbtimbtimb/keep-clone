<script lang="ts">
import type { NoteType } from '~/components/NotesList.vue'
import fetchNotes from '../utils/fetchNotes'
import addNote from '../utils/addNote'
import updateNote from '../utils/updateNote'
import deleteNote from '~/utils/deleteNote'

export default {
  data () {
    return {
      notes: [] as NoteType[],
      loading: true
    }
  },
  async created () {
    await this.fetchNotesHandler()
  },
  methods: {
    async fetchNotesHandler () {
      const notes = await fetchNotes()
      if (notes == null) {
        return
      }
      this.notes = notes
      this.loading = false
    },
    async updateNoteHandler (data: NoteType) {
      const index = this.notes.findIndex((note) => note.id === data.id)
      if (index === -1) {
        console.error(`Could not find note ${data.id}`)
        return
      }

      const note = await updateNote(data)

      if (note == null) {
        return
      }

      this.notes[index] = note
    },
    async addNoteHandler (data: NoteType) {
      const note = await addNote(data)

      if (note == null) {
        return
      }

      this.notes.unshift({
        ...note
      })
    },
    async deleteNoteHandler (id: number) {
      const response = await deleteNote(id)

      if (!response) {
        return
      }

      const index = this.notes.findIndex(note => note.id === id)
      if (index === -1) {
        throw new Error(`No note with ID of ${id}`)
      }
      this.notes.splice(index, 1)
    }
  }
}
</script>

<template>
  <div class="NotesPage">
    <TakeANote :add-note="addNoteHandler" />
    <NotesList
      v-if="!loading"
      :notes="notes"
      :update-note="updateNoteHandler"
      :delete-note="deleteNoteHandler"
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
