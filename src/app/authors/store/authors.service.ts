import { db } from 'config/firebase'
import { FbCollection } from 'utils/firebase.types'
import { collectionToIdMap, ObjectIdMap } from 'utils/firestore.helpers'

import { Author } from '../authors.types'

const TABLE = 'authors'

const authorsService = {
  async fetchAuthorsByOwner(ownerId): Promise<ObjectIdMap<Author>> {
    const query = db.collection(TABLE).where('owner', '==', ownerId)
    const response: FbCollection = await query.get()
    return collectionToIdMap<Author>(response)
  },
}

export default authorsService
