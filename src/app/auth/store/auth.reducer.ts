import produce from 'immer'

import { ReduxAction, ReduxActionPayload } from 'store/store.types'
import { FbError } from 'utils/firebase.types'

import { User } from '../auth.types'

export const actionTypes = {
  LOGIN: 'AUTH/LOGIN',
  LOGIN_FAILURE: 'AUTH/LOGIN_FAILURE',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',

  LOGOUT: 'AUTH/LOGOUT',
  LOGOUT_SUCCESS: 'AUTH/LOGOUT_SUCCESS',

  REGISTER: 'AUTH/REGISTER',
  REGISTER_FAILURE: 'AUTH/REGISTER_FAILURE',
  REGISTER_SUCCESS: 'AUTH/REGISTER_SUCCESS',
}

export type AuthActionPayload = {
  user: User
} & ReduxActionPayload

export type AuthState = {
  data: User
  error?: FbError
  requestPending: boolean
}

export const defaultState = (): AuthState => ({
  data: {} as User, // eslint-disable-line
  error: undefined,
  requestPending: false,
})

export const authReducer = (
  state: AuthState = defaultState(),
  action: ReduxAction<AuthActionPayload>,
) =>
  produce(state, draft => {
    switch (action.type) {
      case actionTypes.LOGIN:
      case actionTypes.REGISTER:
        draft.requestPending = true
        return

      case actionTypes.LOGIN_SUCCESS:
        draft.data = action.payload.user
        draft.error = undefined
        draft.requestPending = false
        return

      case actionTypes.LOGOUT_SUCCESS:
        draft.data = {} as User // eslint-disable-line
        draft.error = undefined
        draft.requestPending = false
        return

      case actionTypes.REGISTER_SUCCESS:
        draft.data = {} as User // eslint-disable-line
        draft.error = undefined
        draft.requestPending = false
        return

      case actionTypes.LOGIN_FAILURE:
      case actionTypes.REGISTER_FAILURE:
        draft.error = action.payload.error
        draft.requestPending = false
        return
    }
  })
