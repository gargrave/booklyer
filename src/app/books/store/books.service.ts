/* eslint-disable sort-keys */
import { db } from 'config/firebase'
import { FbCollection, FbDoc, FbDocRef } from 'utils/firebase.types'
import {
  collectionToIdMap,
  ObjectIdMap,
  singleToIdMap,
} from 'utils/firestore.helpers'

import { Author } from 'app/authors/authors.types'
import { Book } from '../books.types'

const booksService = {
  async fetchBooksByOwner(ownerId: string): Promise<ObjectIdMap<Book>> {
    const query = db.collection(`books/byOwner/${ownerId}`)
    const response: FbCollection = await query.get()
    return collectionToIdMap<Book>(response)
  },

  async createBook(ownerId: string, payload: Book): Promise<ObjectIdMap<Book>> {
    const date = new Date()
    // pull "author" field off of book--we will rename this to "authorId"
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

  async updateBook(ownerId: string, payload: Book): Promise<ObjectIdMap<Book>> {
    const date = new Date()
    // pull "author" field off of book--we will rename this to "authorId"
    // also pull "id" field off, because we don't need this actually stored in the record
    const { author, id, ...rest } = payload
    const book = {
      ...rest,
      authorId: author,
      updated: date,
    }

    const docRef: FbDocRef = await db
      .collection(`books/byOwner/${ownerId}`)
      .doc(id)
    await docRef.update(book)
    const response: FbDoc = await docRef.get()
    return singleToIdMap<Book>(response)
  },

  async deleteBook(ownerId: string, payload: Book): Promise<ObjectIdMap<Book>> {
    const { id } = payload
    const docRef: FbDocRef = await db
      .collection(`books/byOwner/${ownerId}`)
      .doc(id)
    return await docRef.delete()
  },

  async deleteBooksByAuthor(
    ownerId: string,
    author: Author,
  ): Promise<ObjectIdMap<Book>> {
    const query = db
      .collection(`books/byOwner/${ownerId}`)
      .where('authorId', '==', author.id)
    const books: FbCollection = await query.get()
    const batch = db.batch()
    books.docs.forEach((doc: FbDoc) => batch.delete(doc.ref))
    return await batch.commit()
  },
}

export default booksService
