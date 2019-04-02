import { Author, AuthorIdMap } from '../../authors.types'
import { actionTypes, AuthorsActionPayload } from '../authors.reducer'
import service from '../authors.service'

const deleteAuthor = (ownerId: string, author: Author) => async dispatch => {
  dispatch({ type: actionTypes.DELETE_AUTHOR })

  const payload: AuthorsActionPayload = {
    authors: {} as AuthorIdMap,
    error: undefined,
  }

  try {
    await service.deleteAuthor(ownerId, author)
    dispatch({
      payload: { authors: { [author.id]: author } },
      type: actionTypes.DELETE_AUTHOR_SUCCESS,
    })
  } catch (err) {
    const hydratedError = { ...err, message: err.message }
    payload.error = hydratedError

    dispatch({
      payload,
      type: actionTypes.DELETE_AUTHOR_FAILURE,
    })
    throw Error
  }
}

export default deleteAuthor
