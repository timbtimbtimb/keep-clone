<script lang="ts">
export interface NoteType {
  id: number,
  title: string,
  content: string
}

export default {
  props: {
    updateNote: { type: Function, required: true },
    notes: {
      type: Array as () => NoteType[],
      default: () => []
    }
  },
  data () {
    return {
      numberOfColumns: this.getNumberOfColumns()
    }
  },
  methods: {
    getNumberOfColumns () {
      const parentRef = this.$refs.parent as HTMLElement | undefined
      if (parentRef == null) {
        return 0
      }
      this.numberOfColumns = Math.floor(parentRef.offsetWidth / 260)
    },
  },
  computed: {
    columns (): { notes: NoteType[]; length: number }[] {
      if (this.numberOfColumns === 0) {
        return []
      }
      const columns: { notes: NoteType[], length: number }[] = Array.from(
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
  beforeDestroy () {
    window.removeEventListener('resize', this.getNumberOfColumns)
  },
}
</script>

<template>
  <div class="Notes" ref="parent">
    <div v-for="({ notes }, i) in columns" :key="i" class="column">
      <Note v-for="(note, j) in notes" :key="j" :note="note" :updateNote="updateNote" />
    </div>
  </div>
</template>

<style>
.Notes {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
}
</style>