import express from 'express'
import cors from 'cors'
import { createHandler } from 'graphql-http/lib/use/express'
import { GraphQLSchema } from 'graphql'
import RootQueryType from './types/RootQueryType'
import generateNotes from './utils/generateNotes'
import RootMutationType from './types/RootMutationType'

const app = express()

export const notes = generateNotes()

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.use(cors())

app.all('/graphql', createHandler({ schema }))

app.listen(5000, () => { console.log('Server is running') })
