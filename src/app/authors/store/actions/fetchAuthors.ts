import { db } from 'config/firebase'
import { TEMP_OWNER_ID } from 'config/firebaseConfig'
import { parseCollection } from 'utils/firestore.helpers'
import { FbCollection } from 'utils/firebase.types'

import { Author } from '../../authors.types'
import { actionTypes } from '../authors.reducers'

const fetchAuthors = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.FETCH_AUTHORS })

  try {
    const query = db.collection('authors').where('owner', '==', TEMP_OWNER_ID)
    const results: FbCollection = await query.get()
    const authors = parseCollection<Author>(results)

    dispatch({
      payload: authors,
      type: actionTypes.FETCH_AUTHORS_SUCCESS,
    })
  } catch (err) {
    const hydratedError = { ...err, message: err.message }
    dispatch({
      payload: hydratedError,
      type: actionTypes.FETCH_AUTHORS_FAILURE,
    })
  }
}

export default fetchAuthors
