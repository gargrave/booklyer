import * as fns from 'firebase-functions'
import * as admin from 'firebase-admin'

import { FbCollection, FbDoc } from '../types'
import { AuthorDocParams } from './authors.types'

const db = admin.firestore()

/**
 * When an Author resource is deleted,
 * this function will be triggered to delete all of the Book resources
 * associated with that Author.
 */
export const cascadeAuthorDelete = fns.firestore
  .document('/authors/byOwner/{ownerId}/{authorId}')
  .onDelete(async (snap, context) => {
    const { authorId, ownerId } = context.params as AuthorDocParams

    if (!authorId || !ownerId) {
      db.collection('/logs/error/cascadeAuthorDeleteToBooks').add({
        authorId,
        context,
        ownerId,
      })
      return
    }

    const query = db
      .collection(`/books/byOwner/${ownerId}`)
      .where('authorId', '==', authorId)
    const books: FbCollection = await query.get()
    const batch = db.batch()
    const deleteBatch = (doc: FbDoc) => batch.delete(doc.ref)
    books.docs.forEach(deleteBatch)
    await batch.commit()

    db.collection('/logs/success/cascadeAuthorDelete').add({
      authorId,
      context,
      ownerId,
    })
  })
