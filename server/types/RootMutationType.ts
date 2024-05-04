import { GraphQLObjectType } from 'graphql'
import updateNote from '../fields/updateNote'
import deleteNote from '../fields/deleteNote'
import addNote from '../fields/addNote'

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',
  fields: () => ({
    addNote,
    updateNote,
    deleteNote
  })
})
