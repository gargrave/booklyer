import { Author } from 'app/authors/authors.types'
import { Book, BookIdMap } from '../../books.types'
import { actionTypes, BooksActionPayload } from '../books.reducer'
import service from '../books.service'

const deleteBooksByAuthor = (
  ownerId: string,
  author: Author,
) => async dispatch => {
  dispatch({ type: actionTypes.DELETE_BOOKS_BY_AUTHOR })

  const payload: BooksActionPayload = {
    books: {} as BookIdMap,
    error: undefined,
  }

  try {
    await service.deleteBooksByAuthor(ownerId, author)
    dispatch({
      payload: { author },
      type: actionTypes.DELETE_BOOKS_BY_AUTHOR_SUCCESS,
    })
  } catch (err) {
    const hydratedError = { ...err, message: err.message }
    payload.error = hydratedError

    dispatch({
      payload,
      type: actionTypes.DELETE_BOOKS_BY_AUTHOR_FAILURE,
    })
    throw Error
  }
}

export default deleteBooksByAuthor