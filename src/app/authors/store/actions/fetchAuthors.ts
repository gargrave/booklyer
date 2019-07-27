import { actionTypes, AuthorsActionPayload } from '../authors.reducer'
import service from '../authors.service'

const fetchAuthors = (ownerId: string) => async dispatch => {
  dispatch({ type: actionTypes.FETCH_AUTHORS })

  const payload: AuthorsActionPayload = {
    authors: {},
    error: undefined,
  }

  try {
    payload.authors = await service.fetchAuthorsByOwner(ownerId)

    dispatch({
      payload,
      type: actionTypes.FETCH_AUTHORS_SUCCESS,
    })
  } catch (err) {
    payload.error = { ...err, message: err.message }

    dispatch({
      payload,
      type: actionTypes.FETCH_AUTHORS_FAILURE,
    })
  }
}

export default fetchAuthors
