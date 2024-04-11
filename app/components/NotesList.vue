<script lang="ts">
export interface NoteType {
  id: number
  title: string
  content: string
}

export default {
  props: {
    updateNote: {
      type: Function,
      required: true
    },
    deleteNote: {
      type: Function,
      required: true
    },
    notes: {
      type: Array as () => NoteType[],
      required: true
    }
  },
  data () {
    return {
      numberOfColumns: this.getNumberOfColumns()
    }
  },
  computed: {
    columns (): Array<{ notes: NoteType[], length: number }> {
      if (this.numberOfColumns === 0) {
        return []
      }
      const columns: Array<{ notes: NoteType[], length: number }> = Array.from(
        { length: this.numberOfColumns },
        () => ({ notes: [], length: 0 })
      )
      this.notes.forEach(({ id, title, content }) => {
        const lengths = columns.map(column => column.length)
        const columnIndex = lengths.findIndex(length => length === Math.min(...lengths))
        columns[columnIndex].notes.push({ id, title, content })
        columns[columnIndex].length += content.length
      })

      return columns
    }
  },
  mounted () {
    this.getNumberOfColumns()
    window.addEventListener('resize', this.getNumberOfColumns)
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.getNumberOfColumns)
  },
  methods: {
    getNumberOfColumns () {
      const parentRef = this.$refs.parent as HTMLElement | undefined
      if (parentRef == null) {
        return 0
      }
      this.numberOfColumns = Math.floor(parentRef.offsetWidth / 260)
    }
  }
}
</script>

<template>
  <div
    ref="parent"
    class="NotesList"
  >
    <div
      v-for="(column, i) in columns"
      :key="i"
      class="column"
    >
      <NoteCard
        v-for="(note, j) in column.notes"
        :key="j"
        :note="note"
        :update-note="updateNote"
        :delete-note="deleteNote"
      />
    </div>
  </div>
</template>

<style>
.NotesList {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
}
</style>
