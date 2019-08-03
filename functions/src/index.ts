/* eslint-disable */
import * as fns from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()
const db = admin.firestore()

type FbDoc = {
  data: (args?: any) => any
  id: string
  ref: any
}

type FbCollection = {
  docs: FbDoc[]
}

type AuthorDocParams = {
  authorId: string
  ownerId: string
}

exports.logAuthorCreate = fns.firestore
  .document('/authors/byOwner/{ownerId}/{authorId}')
  .onCreate((snap, context) => {
    const newDoc = snap.data()
    const { authorId = 'noAuthorId', ownerId = 'noOwnerId' } = context.params
    const firstName = newDoc!.firstName || 'noFirstName'
    const lastName = newDoc!.lastName || 'noLastName'

    db.collection('/logs/success/createAuthor').add({
      authorId,
      firstName,
      lastName,
      ownerId,
    })
  })

exports.cascadeAuthorDelete = fns.firestore
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
