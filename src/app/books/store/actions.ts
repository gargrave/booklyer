import { Book } from '../books.types'
import types from './actionTypes'

import { db } from 'config/firebase'
import { TEMP_OWNER_ID } from 'config/firebaseConfig'
import { parseCollection } from 'utils/firestore.helpers'
import { FbCollection } from 'utils/firebase.types'

export const fetchBooks = () => async (dispatch, getState) => {
  const query = db.collection('books').where('owner', '==', TEMP_OWNER_ID)
  const results: FbCollection = await query.get()
  const books = parseCollection<Book>(results)

  dispatch({
    payload: books,
    type: types.FETCH_BOOKS_SUCCESS,
  })
}
