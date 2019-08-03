import { Author } from 'app/authors/authors.types'
import { actionTypes } from '../books.reducer'

const deleteBooksByAuthor = (
  ownerId: string,
  author: Author,
) => async dispatch => {
  dispatch({
    payload: { author },
    type: actionTypes.DELETE_BOOKS_BY_AUTHOR,
  })
}

export default deleteBooksByAuthor
