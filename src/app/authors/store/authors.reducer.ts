import produce from 'immer'

import { ReduxAction, ReduxActionPayload } from 'store/store.types'
import { FbError } from 'utils/firebase.types'

import { actionTypes as authActionTypes } from 'app/auth/store/auth.reducer'
import { AuthorIdMap } from '../authors.types'

export const actionTypes = {
  CREATE_AUTHOR: 'AUTHORS/CREATE_AUTHOR',
  CREATE_AUTHOR_FAILURE: 'AUTHORS/CREATE_AUTHOR_FAILURE',
  CREATE_AUTHOR_SUCCESS: 'AUTHORS/CREATE_AUTHOR_SUCCESS',

  DELETE_AUTHOR: 'AUTHORS/DELETE_AUTHOR',
  DELETE_AUTHOR_FAILURE: 'AUTHORS/DELETE_AUTHOR_FAILURE',
  DELETE_AUTHOR_SUCCESS: 'AUTHORS/DELETE_AUTHOR_SUCCESS',

  FETCH_AUTHORS: 'AUTHORS/FETCH_AUTHORS',
  FETCH_AUTHORS_FAILURE: 'AUTHORS/FETCH_AUTHORS_FAILURE',
  FETCH_AUTHORS_SUCCESS: 'AUTHORS/FETCH_AUTHORS_SUCCESS',

  UPDATE_AUTHOR: 'AUTHORS/UPDATE_AUTHOR',
  UPDATE_AUTHOR_FAILURE: 'AUTHORS/UPDATE_AUTHOR_FAILURE',
  UPDATE_AUTHOR_SUCCESS: 'AUTHORS/UPDATE_AUTHOR_SUCCESS',
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
      case actionTypes.DELETE_AUTHOR:
      case actionTypes.FETCH_AUTHORS:
      case actionTypes.UPDATE_AUTHOR:
        draft.requestPending = true
        return

      case actionTypes.CREATE_AUTHOR_SUCCESS:
      case actionTypes.UPDATE_AUTHOR_SUCCESS:
        draft.data = {
          ...draft.data,
          ...action.payload.authors,
        }
        draft.error = undefined
        draft.requestPending = false
        return

      case actionTypes.DELETE_AUTHOR_SUCCESS:
        Object.values(action.payload.authors).forEach(
          deletedAuthor => delete draft.data[deletedAuthor.id],
        )
        draft.error = undefined
        draft.requestPending = false
        return

      case actionTypes.FETCH_AUTHORS_SUCCESS:
        draft.data = action.payload.authors
        draft.error = undefined
        draft.requestPending = false
        return

      case actionTypes.CREATE_AUTHOR_FAILURE:
      case actionTypes.DELETE_AUTHOR_FAILURE:
      case actionTypes.FETCH_AUTHORS_FAILURE:
      case actionTypes.UPDATE_AUTHOR_FAILURE:
        draft.error = action.payload.error
        draft.requestPending = false
        return

      // clear all data on logout
      case authActionTypes.LOGOUT_SUCCESS:
        draft.data = {}
        draft.error = undefined
        draft.requestPending = false
        return
    }
  })
