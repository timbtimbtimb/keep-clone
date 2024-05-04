export interface NoteType {
  id: number
  title: string
  content: string
}

function generateNoteContent (): string {
  return Array.from(
    { length: Math.round(Math.random() * 6) + 1 },
    () => 'Note content, which is probably a bit longer than title but not ncecessarily.'
  ).join(' ')
}

export default function generateNotes (): NoteType[] {
  let index = 0
  return Array.from(
    { length: 45 },
    () => {
      index += 1
      return {
        id: index,
        title: `Note ${index}`,
        content: generateNoteContent()
      }
    }
  )
}
