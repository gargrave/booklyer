import { Book } from '../../books.types'
import { actionTypes, BooksActionPayload } from '../books.reducer'
import service from '../books.service'

const updateBook = (ownerId: string, book: Book) => async dispatch => {
  dispatch({ type: actionTypes.UPDATE_BOOK })

  const payload: BooksActionPayload = {
    books: {},
    error: undefined,
  }

  try {
    payload.books = await service.updateBook(ownerId, book)

    dispatch({
      payload,
      type: actionTypes.UPDATE_BOOK_SUCCESS,
    })
  } catch (err) {
    payload.error = { ...err, message: err.message }

    dispatch({
      payload,
      type: actionTypes.UPDATE_BOOK_FAILURE,
    })
    throw Error
  }
}

export default updateBook
