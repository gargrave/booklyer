import produce from 'immer'

import { ReduxAction, ReduxActionPayload } from 'app/core/core.types'
import { FbError } from 'utils/firebase.types'

import { AuthorIdMap } from '../authors.types'

export const actionTypes = {
  CREATE_AUTHOR: 'AUTHORS/CREATE_AUTHOR',
  CREATE_AUTHOR_FAILURE: 'AUTHORS/CREATE_AUTHOR_FAILURE',
  CREATE_AUTHOR_SUCCESS: 'AUTHORS/CREATE_AUTHOR_SUCCESS',

  FETCH_AUTHORS: 'AUTHORS/FETCH_AUTHORS',
  FETCH_AUTHORS_FAILURE: 'AUTHORS/FETCH_AUTHORS_FAILURE',
  FETCH_AUTHORS_SUCCESS: 'AUTHORS/FETCH_AUTHORS_SUCCESS',
}

export type AuthorsActionPayload = {
  authors: AuthorIdMap
} & ReduxActionPayload

export type AuthorsState = {
  data: AuthorIdMap
  error?: FbError
  requestPending: boolean
}

export const defaultState = (): AuthorsState => ({
  data: {} as AuthorIdMap,
  error: undefined,
  requestPending: false,
})

export const authorsReducer = (
  state: AuthorsState = defaultState(),
  action: ReduxAction<AuthorsActionPayload>,
) =>
  produce(state, draft => {
    switch (action.type) {
      case actionTypes.CREATE_AUTHOR:
      case actionTypes.FETCH_AUTHORS:
        draft.requestPending = true
        return

      case actionTypes.CREATE_AUTHOR_SUCCESS:
        draft.data = {
          ...draft.data,
          ...action.payload.authors,
        }
        draft.requestPending = false
        return

      case actionTypes.CREATE_AUTHOR_FAILURE:
        draft.error = action.payload.error
        draft.requestPending = false
        return

      case actionTypes.FETCH_AUTHORS_FAILURE:
        draft.error = action.payload.error
        draft.requestPending = false
        return

      case actionTypes.FETCH_AUTHORS_SUCCESS:
        draft.data = action.payload.authors
        draft.error = undefined
        draft.requestPending = false
        return
    }
  })
