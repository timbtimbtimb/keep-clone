import type { NoteType } from '~/components/NotesList.vue'
import graphQLRequest from './graphQLRequest'

export default async function addNote (data: NoteType): Promise<NoteType | null> {
  if (data.title === '' && data.content === '') {
    console.warn('Cannot add an empty note.')
    return null
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
    console.log(`Added note ${response.addNote.id}`)
    return response.addNote
  } catch (error) {
    console.error(`Failed to add note: ${String(error)}`)
    return null
  }
}
