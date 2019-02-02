import { TEMP_OWNER_ID } from 'config/firebaseConfig'

import authorsActions from 'app/authors/store/actions'
import { getAuthors } from 'app/authors/store/selectors'

import { BookIdMap } from '../../books.types'
import { actionTypes, BooksActionPayload } from '../books.reducers'
import service from '../books.service'

const fetchBooks = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.FETCH_BOOKS })

  const payload: BooksActionPayload = {
    books: {} as BookIdMap,
    error: undefined,
  }

  try {
    // ensure we have queried authors first
    const authors = getAuthors(getState().authors)
    if (!authors.length) {
      await dispatch(authorsActions.fetchAuthors())
    }

    payload.books = await service.fetchBooksByOwner(TEMP_OWNER_ID)

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
