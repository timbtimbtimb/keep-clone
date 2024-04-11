import type { NoteType } from '~/components/NotesList.vue'
import graphQLRequest from './graphQLRequest'

export default async function updateNote (data: NoteType): Promise<NoteType | null> {
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
    console.log(`Updated note ${data.id}`)
    return response.updateNote
  } catch (error) {
    console.error(`Failed to update note ${data.id}: ${String(error)}`)
    return null
  }
}
