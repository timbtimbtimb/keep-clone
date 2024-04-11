import graphQLRequest from './graphQLRequest'

export default async function deleteNote (id: number): Promise<boolean> {
  const query = `
    mutation{
      deleteNote(
        id: ${id}
      ), { id, content, title }
    }
  `

  try {
    await graphQLRequest(query)
    console.log(`Deleted note ${id}`)
    return true
  } catch (error) {
    console.error(`Failed to update note ${id}: ${String(error)}`)
    return false
  }
}
