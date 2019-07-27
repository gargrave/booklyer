import { Author } from '../../authors.types'
import { actionTypes, AuthorsActionPayload } from '../authors.reducer'
import service from '../authors.service'

const updateAuthor = (ownerId: string, author: Author) => async dispatch => {
  dispatch({ type: actionTypes.UPDATE_AUTHOR })

  const payload: AuthorsActionPayload = {
    authors: {},
    error: undefined,
  }

  try {
    payload.authors = await service.updateAuthor(ownerId, author)

    dispatch({
      payload,
      type: actionTypes.UPDATE_AUTHOR_SUCCESS,
    })
  } catch (err) {
    payload.error = { ...err, message: err.message }

    dispatch({
      payload,
      type: actionTypes.UPDATE_AUTHOR_FAILURE,
    })
    throw Error
  }
}

export default updateAuthor
