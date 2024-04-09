import type { NoteType } from '~/components/NotesList.vue'
import graphQLRequest from './graphQLRequest'

export default async function fetchNotes (): Promise<NoteType[] | null> {
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
    const { notes } = await graphQLRequest(query) as { notes: NoteType[] }
    return notes
  } catch (error) {
    console.error('Failed to fetch notes')
    return null
  }
}
