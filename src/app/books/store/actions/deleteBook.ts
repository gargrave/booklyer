import { Book } from '../../books.types'
import { actionTypes, BooksActionPayload } from '../books.reducer'
import service from '../books.service'

const deleteBook = (ownerId: string, book: Book) => async dispatch => {
  dispatch({ type: actionTypes.DELETE_BOOK })

  const payload: BooksActionPayload = {
    books: {},
    error: undefined,
  }

  try {
    await service.deleteBook(ownerId, book)
    dispatch({
      payload: { books: { [book.id]: book } },
      type: actionTypes.DELETE_BOOK_SUCCESS,
    })
  } catch (err) {
    payload.error = { ...err, message: err.message }

    dispatch({
      payload,
      type: actionTypes.DELETE_BOOK_FAILURE,
    })
    throw Error
  }
}

export default deleteBook
