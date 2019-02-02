import { db } from 'config/firebase'
import { TEMP_OWNER_ID } from 'config/firebaseConfig'
import { collectionToIdMap } from 'utils/firestore.helpers'
import { FbCollection } from 'utils/firebase.types'

import authorsActions from '../../../authors/store/actions'
import { getAuthors } from '../../../authors/store/selectors'

import { Book, BookIdMap } from '../../books.types'
import { actionTypes, BooksActionPayload } from '../books.reducers'

const fetchBooks = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.FETCH_BOOKS })

  const payload: BooksActionPayload = {
    books: {} as BookIdMap,
    error: undefined,
  }

  try {
    let authors = getAuthors(getState().authors)
    if (!authors.length) {
      await dispatch(authorsActions.fetchAuthors())
      authors = getAuthors(getState().authors)
    }

    const query = db.collection('books').where('owner', '==', TEMP_OWNER_ID)
    const results: FbCollection = await query.get()
    payload.books = collectionToIdMap<Book>(results)

    dispatch({
      payload,
      type: actionTypes.FETCH_BOOKS_SUCCESS,
    })
  } catch (err) {
    const hydratedError = { ...err, message: err.message }
    payload.error = hydratedError

    dispatch({
      payload,
      type: actionTypes.FETCH_BOOKS_FAILURE,
    })
  }
}

export default fetchBooks
