import { db } from 'config/firebase'
import { FbCollection } from 'utils/firebase.types'
import { collectionToIdMap, ObjectIdMap } from 'utils/firestore.helpers'

import { Book } from '../books.types'

const booksService = {
  async fetchBooksByOwner(ownerId): Promise<ObjectIdMap<Book>> {
    const query = db.collection(`books/byOwner/${ownerId}`)
    const response: FbCollection = await query.get()
    return collectionToIdMap<Book>(response)
  },
}

export default booksService
