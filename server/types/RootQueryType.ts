import { GraphQLObjectType } from 'graphql'
import getNotes from '../fields/getNotes'
import getNote from '../fields/getNote'

export default new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    notes: getNotes,
    note: getNote
  })
})
