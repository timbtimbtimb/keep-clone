import express from 'express'
import cors from 'cors'
import { createHandler } from 'graphql-http/lib/use/express'
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'

const app = express()

interface NoteType {
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

const GraphQLNoteType = new GraphQLObjectType({
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
      type: new GraphQLList(GraphQLNoteType),
      description: 'List of notes',
      resolve: () => {
        console.log('Requested all notes.')
        return notes
      }
    },
    note: {
      type: GraphQLNoteType,
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
  description: 'Root mutation',
  fields: () => ({
    addNote: {
      type: GraphQLNoteType,
      description: 'Add a note',
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) }
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
    },
    updateNote: {
      type: GraphQLNoteType,
      description: 'Update a note',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) }
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
    },
    deleteNote: {
      type: GraphQLNoteType,
      description: 'Delete a note',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) }
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
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.use(cors())

app.all('/graphql', createHandler({ schema }))

app.listen(5000, () => { console.log('Server is running') })
