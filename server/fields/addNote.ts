import { GraphQLNonNull, GraphQLString } from 'graphql'
import GraphQLNoteType from '../types/GraphQLNoteType'
import { notes } from '../server'
import { type NoteType } from '../utils/generateNotes'

export default {
  type: GraphQLNoteType,
  description: 'Add a note',
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (parent: any, args: any) => {
    const note = {
      id: Math.max(0, ...notes.map((note: NoteType): number => note.id)) + 1,
      title: args.title,
      content: args.content
    }
    notes.unshift(note)
    console.log(`Added note ${note.id} (${note.title})`)
    return note
  }
}
