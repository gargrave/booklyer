import { db } from 'config/firebase'
import { TEMP_OWNER_ID } from 'config/firebaseConfig'
import { collectionToIdMap } from 'utils/firestore.helpers'
import { FbCollection } from 'utils/firebase.types'

import { Author, AuthorIdMap } from '../../authors.types'
import { actionTypes, AuthorsActionPayload } from '../authors.reducers'

const fetchAuthors = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.FETCH_AUTHORS })

  const payload: AuthorsActionPayload = {
    authors: {} as AuthorIdMap,
    error: undefined,
  }

  try {
    const query = db.collection('authors').where('owner', '==', TEMP_OWNER_ID)
    const results: FbCollection = await query.get()
    payload.authors = collectionToIdMap<Author>(results)

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
