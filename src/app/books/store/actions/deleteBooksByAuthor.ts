import { Author } from 'app/authors/authors.types'
import { actionTypes, BooksActionPayload } from '../books.reducer'
import service from '../books.service'

const deleteBooksByAuthor = (
  ownerId: string,
  author: Author,
) => async dispatch => {
  dispatch({ type: actionTypes.DELETE_BOOKS_BY_AUTHOR })

  const payload: BooksActionPayload = {
    books: {},
    error: undefined,
  }

  try {
    await service.deleteBooksByAuthor(ownerId, author)
    dispatch({
      payload: { author },
      type: actionTypes.DELETE_BOOKS_BY_AUTHOR_SUCCESS,
    })
  } catch (err) {
    payload.error = { ...err, message: err.message }

    dispatch({
      payload,
      type: actionTypes.DELETE_BOOKS_BY_AUTHOR_FAILURE,
    })
    throw Error
  }
}

export default deleteBooksByAuthor
