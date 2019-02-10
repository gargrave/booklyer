import { AuthorIdMap } from '../../authors.types'
import { actionTypes, AuthorsActionPayload } from '../authors.reducers'
import service from '../authors.service'

const fetchAuthors = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.FETCH_AUTHORS })

  const payload: AuthorsActionPayload = {
    authors: {} as AuthorIdMap,
    error: undefined,
  }

  try {
    const ownerId = process.env.BOOKLYER_FIREBASE_TEMP_OWNER_ID
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
