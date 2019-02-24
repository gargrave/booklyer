import { db } from 'config/firebase'
import { FbCollection, FbDoc } from 'utils/firebase.types'
import {
  collectionToIdMap,
  ObjectIdMap,
  singleToIdMap,
} from 'utils/firestore.helpers'

import { Author } from '../authors.types'

const TABLE = 'authors'

const authorsService = {
  async fetchAuthorsByOwner(ownerId: string): Promise<ObjectIdMap<Author>> {
    const query = db.collection(TABLE).where('owner', '==', ownerId)
    const response: FbCollection = await query.get()
    return collectionToIdMap<Author>(response)
  },

  async createAuthor(
    ownerId: string,
    payload: Author,
  ): Promise<ObjectIdMap<Author>> {
    const author = {
      ...payload,
      created: new Date(),
      owner: ownerId,
      updated: new Date(),
    }
    const query = await db.collection(TABLE).add(author)
    const response: FbDoc = await query.get()
    return singleToIdMap<Author>(response)
  },
}

export default authorsService
