import { GraphQLInt, GraphQLNonNull } from 'graphql'
import GraphQLNoteType from '../types/GraphQLNoteType'
import { notes } from '../server'

export default {
  type: GraphQLNoteType,
  description: 'A single note',
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve: (parent: any, args: any) => notes.find(note => note.id === args.id)
}
