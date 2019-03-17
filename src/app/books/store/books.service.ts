import { db } from 'config/firebase'
import { FbCollection, FbDoc } from 'utils/firebase.types'
import {
  collectionToIdMap,
  ObjectIdMap,
  singleToIdMap,
} from 'utils/firestore.helpers'

import { Book } from '../books.types'

const booksService = {
  async fetchBooksByOwner(ownerId): Promise<ObjectIdMap<Book>> {
    const query = db.collection(`books/byOwner/${ownerId}`)
    const response: FbCollection = await query.get()
    return collectionToIdMap<Book>(response)
  },

  async createBook(ownerId: string, payload: Book): Promise<ObjectIdMap<Book>> {
    const date = new Date()
    // pull "author" field off of book--will we rename this to "authorId"
    const { author, ...rest } = payload
    const book = {
      ...rest,
      authorId: author,
      created: date,
      updated: date,
    }
    const query = await db.collection(`books/byOwner/${ownerId}`).add(book)
    const response: FbDoc = await query.get()
    return singleToIdMap<Book>(response)
  },
}

export default booksService
