import { TEMP_OWNER_ID } from 'config/firebaseConfig'

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
    payload.authors = await service.fetchAuthorsByOwner(TEMP_OWNER_ID)

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
