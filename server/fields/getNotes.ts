import { GraphQLList } from 'graphql'
import GraphQLNoteType from '../types/GraphQLNoteType'
import { notes } from '../server'

export default {
  type: new GraphQLList(GraphQLNoteType),
  description: 'List of notes',
  resolve: () => {
    console.log('Requested all notes.')
    return notes
  }
}
