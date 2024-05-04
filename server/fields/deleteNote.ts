import {
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'
import GraphQLNoteType from '../types/GraphQLNoteType'
import { notes } from '../server'

export default {
  type: GraphQLNoteType,
  description: 'Delete a note',
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve: (parent: any, args: any) => {
    const index = notes.findIndex(note => note.id === args.id)
    if (index === -1) {
      throw new Error(`No note with ID of ${args.id}`)
    }
    notes.splice(index, 1)
    console.log(`Deleted note ${args.id} (${args.title})`)
    return true
  }
}
