import { Author, AuthorIdMap } from '../../authors.types'
import { actionTypes, AuthorsActionPayload } from '../authors.reducers'
import service from '../authors.service'

const createAuthor = (ownerId: string, author: Author) => async dispatch => {
  dispatch({ type: actionTypes.CREATE_AUTHOR })

  const payload: AuthorsActionPayload = {
    authors: {} as AuthorIdMap,
    error: undefined,
  }

  try {
    payload.authors = await service.createAuthor(ownerId, author)

    dispatch({
      payload,
      type: actionTypes.CREATE_AUTHOR_SUCCESS,
    })
  } catch (err) {
    const hydratedError = { ...err, message: err.message }
    payload.error = hydratedError

    dispatch({
      payload,
      type: actionTypes.CREATE_AUTHOR_FAILURE,
    })
    throw Error
  }
}

export default createAuthor
