import { fetchAuthors } from 'app/authors/store/actions'
import { getAuthors } from 'app/authors/store/selectors'

import { BookIdMap } from '../../books.types'
import { actionTypes, BooksActionPayload } from '../books.reducer'
import service from '../books.service'

const fetchBooks = (ownerId: string) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.FETCH_BOOKS })

  const payload: BooksActionPayload = {
    books: {} as BookIdMap,
    error: undefined,
  }

  try {
    // ensure we have queried authors first
    const authors = getAuthors(getState().authors)
    if (!authors.length) {
      await dispatch(fetchAuthors(ownerId))
    }

    payload.books = await service.fetchBooksByOwner(ownerId)

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
