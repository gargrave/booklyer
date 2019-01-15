import { db } from 'config/firebase'
import { TEMP_OWNER_ID } from 'config/firebaseConfig'
import { collectionToIdMap } from 'utils/firestore.helpers'
import { FbCollection } from 'utils/firebase.types'

import authorsActions from '../../../authors/store/actions'
import { getAuthors } from '../../../authors/store/authors.selectors'

import { Book } from '../../books.types'
import { actionTypes } from '../books.reducers'

const fetchBooks = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.FETCH_BOOKS })

  try {
    let authors = getAuthors(getState().authors)
    if (!authors.length) {
      await dispatch(authorsActions.fetchAuthors())
      authors = getAuthors(getState().authors)
    }

    const query = db.collection('books').where('owner', '==', TEMP_OWNER_ID)
    const results: FbCollection = await query.get()
    const books = collectionToIdMap<Book>(results)

    dispatch({
      payload: { books },
      type: actionTypes.FETCH_BOOKS_SUCCESS,
    })
  } catch (err) {
    const hydratedError = { ...err, message: err.message }
    dispatch({
      payload: hydratedError,
      type: actionTypes.FETCH_BOOKS_FAILURE,
    })
  }
}

export default fetchBooks
