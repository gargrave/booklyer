import { AuthorIdMap } from '../../authors.types'
import { actionTypes, AuthorsActionPayload } from '../authors.reducer'
import service from '../authors.service'

const fetchAuthors = (ownerId: string) => async dispatch => {
  dispatch({ type: actionTypes.FETCH_AUTHORS })

  const payload: AuthorsActionPayload = {
    authors: {} as AuthorIdMap,
    error: undefined,
  }

  try {
    payload.authors = await service.fetchAuthorsByOwner(ownerId)

    dispatch({
      payload,
      type: actionTypes.FETCH_AUTHORS_SUCCESS,
    })
  } catch (err) {
    const hydratedError = { ...err, message: err.message }
    payload.error = hydratedError

    dispatch({
      payload,
      type: actionTypes.FETCH_AUTHORS_FAILURE,
    })
  }
}

export default fetchAuthors
