import { Author } from '../authors.types'
import types from './actionTypes'

import { db } from 'config/firebase'
import { TEMP_OWNER_ID } from 'config/firebaseConfig'
import { parseCollection } from 'utils/firestore.helpers'
import { FbCollection } from 'utils/firebase.types'

export const fetchAuthors = () => async (dispatch, getState) => {
  const query = db.collection('authors').where('owner', '==', TEMP_OWNER_ID)
  const results: FbCollection = await query.get()
  const authors = parseCollection(results, f => f)
  dispatch({
    payload: authors,
    type: types.FETCH_AUTHORS_SUCCESS,
  })
}
