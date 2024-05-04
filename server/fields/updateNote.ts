import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'
import GraphQLNoteType from '../types/GraphQLNoteType'
import { notes } from '../server'

export default {
  type: GraphQLNoteType,
  description: 'Update a note',
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (parent: any, args: any) => {
    const index = notes.findIndex(note => note.id === args.id)
    if (index === -1) {
      throw new Error(`No note with ID of ${args.id}`)
    }
    const note = {
      id: args.id,
      title: args.title,
      content: args.content
    }
    notes[index] = { ...note }
    console.log(`Updated note ${note.id} (${note.title})`)
    return note
  }
}
