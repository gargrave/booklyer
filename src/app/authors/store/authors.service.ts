import { db } from 'config/firebase'
import { FbCollection, FbDoc } from 'utils/firebase.types'
import {
  collectionToIdMap,
  ObjectIdMap,
  singleToIdMap,
} from 'utils/firestore.helpers'

import { Author } from '../authors.types'

const authorsService = {
  async fetchAuthorsByOwner(ownerId: string): Promise<ObjectIdMap<Author>> {
    const query = db.collection(`authors/byOwner/${ownerId}`)
    const response: FbCollection = await query.get()
    return collectionToIdMap<Author>(response)
  },

  async createAuthor(
    ownerId: string,
    payload: Author,
  ): Promise<ObjectIdMap<Author>> {
    const date = new Date()
    const author = {
      ...payload,
      created: date,
      updated: date,
    }
    const query = await db.collection(`authors/byOwner/${ownerId}`).add(author)
    const response: FbDoc = await query.get()
    return singleToIdMap<Author>(response)
  },
}

export default authorsService
