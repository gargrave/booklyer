import { db } from 'config/firebase'
import { TEMP_OWNER_ID } from 'config/firebaseConfig'
import { parseCollection } from 'utils/firestore.helpers'
import { FbCollection } from 'utils/firebase.types'

import { Book } from '../../books.types'
import { actionTypes } from '../books.reducers'

const fetchBooks = () => async (dispatch, getState) => {
  const query = db.collection('books').where('owner', '==', TEMP_OWNER_ID)
  const results: FbCollection = await query.get()
  const books = parseCollection<Book>(results)

  dispatch({
    payload: books,
    type: actionTypes.FETCH_BOOKS_SUCCESS,
  })
}

export default fetchBooks
