<script lang="ts">
export default {
  data () {
    return {
      notes: [],
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
  },
}
</script>

<template>
  <div class="NotesPage">
    <TakeANote />
    <Notes v-if="!loading" :notes="notes" />
  </div>
</template>

<style>
.NotesPage {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}
</style>
