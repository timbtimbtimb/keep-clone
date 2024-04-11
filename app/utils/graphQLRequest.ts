export default async function graphQLRequest (query: string): Promise<unknown> {
  try {
    const response = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    })
    const { data } = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching notes:', error)
  }
}
