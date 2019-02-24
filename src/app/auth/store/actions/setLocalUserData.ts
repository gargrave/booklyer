import { actionTypes, AuthActionPayload } from '../auth.reducer'

const setLocalUserData = user => async dispatch => {
  const action = !!user ? actionTypes.LOGIN_SUCCESS : actionTypes.LOGOUT_SUCCESS
  const payload: AuthActionPayload = {
    user,
    error: undefined,
  }

  dispatch({
    payload,
    type: action,
  })
}

export default setLocalUserData
