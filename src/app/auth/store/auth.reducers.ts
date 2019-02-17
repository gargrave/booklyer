import produce from 'immer'

import { ReduxAction, ReduxActionPayload } from 'app/core/core.types'
import { FbError } from 'utils/firebase.types'

import { User } from '../auth.types'

export const actionTypes = {
  LOGIN: 'AUTH/LOGIN',
  LOGIN_FAILURE: 'AUTH/LOGIN_FAILURE',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',

  LOGOUT: 'AUTH/LOGOUT',
  LOGOUT_SUCCESS: 'AUTH/LOGOUT_SUCCESS',
}

export type AuthActionPayload = {
  user: User
} & ReduxActionPayload

export type AuthState = {
  data: User
  error?: FbError
  requestPending: boolean
}

const defaultState = (): AuthState => ({
  data: {} as User,
  error: undefined,
  requestPending: false,
})

const reducers = (
  state: AuthState = defaultState(),
  action: ReduxAction<AuthActionPayload>,
) =>
  produce(state, draft => {
    switch (action.type) {
      case actionTypes.LOGIN:
        draft.requestPending = true
        return

      case actionTypes.LOGIN_SUCCESS:
        draft.data = action.payload.user
        draft.error = undefined
        draft.requestPending = false
        return

      case actionTypes.LOGIN_FAILURE:
        draft.error = action.payload.error
        draft.requestPending = false
        return

      case actionTypes.LOGOUT_SUCCESS:
        draft.data = {} as User
        draft.error = undefined
        draft.requestPending = false
        return
    }
  })

export default reducers
