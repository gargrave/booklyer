import produce from 'immer'

import { ReduxAction } from 'app/core/types'
import { FbError } from 'utils/firebase.types'

import { Author } from '../authors.types'

export const actionTypes = {
  CREATE_AUTHOR: 'AUTHORS/CREATE_AUTHOR',
  CREATE_AUTHOR_FAILURE: 'AUTHORS/CREATE_AUTHOR_FAILURE',
  CREATE_AUTHOR_SUCCESS: 'AUTHORS/CREATE_AUTHOR_SUCCESS',

  FETCH_AUTHORS: 'AUTHORS/FETCH_AUTHORS',
  FETCH_AUTHORS_FAILURE: 'AUTHORS/FETCH_AUTHORS_FAILURE',
  FETCH_AUTHORS_SUCCESS: 'AUTHORS/FETCH_AUTHORS_SUCCESS',
}

export type AuthorsState = {
  data: Author[]
  error?: FbError
  requestPending: boolean
}

const defaultState = (): AuthorsState => ({
  data: [],
  error: undefined,
  requestPending: false,
})

const reducers = (state: AuthorsState = defaultState(), action: ReduxAction) =>
  produce(state, draft => {
    switch (action.type) {
      case actionTypes.CREATE_AUTHOR:
      case actionTypes.FETCH_AUTHORS:
        draft.requestPending = true
        return

      case actionTypes.CREATE_AUTHOR_SUCCESS:
        console.log('Reducer: CREATE_AUTHOR_SUCCESS')
        draft.requestPending = false
        return

      case actionTypes.CREATE_AUTHOR_FAILURE:
        console.log('Reducer: CREATE_AUTHOR_FAILURE')
        draft.requestPending = false
        return

      case actionTypes.FETCH_AUTHORS_FAILURE:
        draft.error = action.payload
        draft.requestPending = false
        return

      case actionTypes.FETCH_AUTHORS_SUCCESS:
        draft.data = action.payload
        draft.error = undefined
        draft.requestPending = false
        return
    }
  })

export default reducers
