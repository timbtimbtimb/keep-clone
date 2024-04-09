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

interface NoteType {
  id: number,
  title: string,
  content: string
}

function generateNoteContent (): string {
  return Array.from(
    { length: Math.round(Math.random() * 6) + 1 },
    () => 'Note content, which is probably a bit longer than title but not ncecessarily.'
  ).join(' ')
}

function generateNotes (): NoteType[] {
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

const notes = generateNotes()

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
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    notes: {
      type: new GraphQLList(NoteType),
      description: 'List of notes',
      resolve: () => notes
    },
    note: {
      type: NoteType,
      description: 'A single note',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent: any, args: any) => notes.find(note => note.id === args.id)
    }
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  desction: 'Root mutation',
  fields: () => ({
    addNote: {
      type: NoteType,
      description: 'Add a note',
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent: any, args: any) => {
        const note = {
          id: Math.max(...notes.map((note: NoteType): number => note.id)) + 1,
          title: args.title,
          content: args.content
        }
        notes.push(note)
        return note
      }
    },
    updateNote: {
      type: NoteType,
      description: 'Update a note',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent: any, args: any) => {
        const index = notes.findIndex(note => note.id = args.id)
        if(index === -1){
          throw new Error(`No note with ID of ${args.id}`)
        }
        const note = {
          id: args.id,
          title: args.title,
          content: args.content
        }
        notes[index] = note
        return note
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(5000, () => console.log('Server is running'))