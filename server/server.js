const express = require('express')
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const {
  graphQLSchema,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const app = express()

function generateNoteContent () {
  return Array.from(
    { length: Math.round(Math.random() * 6) + 1 },
    () => 'Note content, which is probably a bit longer than title but not ncecessarily.'
  ).join(' ')
}

function generateNotes () {
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

const NoteType = new GraphQLObjectType({
  name: 'Note',
  description: 'This represents a note with a title',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLNonNull(GraphQLString) }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Notes',
  description: 'List of all the notes',
  fields: () => ({
    notes: {
      type: new GraphQLList(NoteType),
      description: 'List of notes',
      resolve: () => generateNotes()
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType
})

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(5000, () => console.log('Server is running'))