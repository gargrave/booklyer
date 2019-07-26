import { Author } from '../../authors.types'
import { actionTypes, AuthorsActionPayload } from '../authors.reducer'
import service from '../authors.service'

const createAuthor = (ownerId: string, author: Author) => async dispatch => {
  dispatch({ type: actionTypes.CREATE_AUTHOR })

  const payload: AuthorsActionPayload = {
    authors: {},
    error: undefined,
  }

  try {
    payload.authors = await service.createAuthor(ownerId, author)

    dispatch({
      payload,
      type: actionTypes.CREATE_AUTHOR_SUCCESS,
    })
  } catch (err) {
    payload.error = { ...err, message: err.message }

    dispatch({
      payload,
      type: actionTypes.CREATE_AUTHOR_FAILURE,
    })
    throw Error
  }
}

export default createAuthor
