import { sanitizeUser } from '../../utils/sanitizeUser'
import { actionTypes, AuthActionPayload } from '../auth.reducers'

const setLocalUserData = rawUser => async dispatch => {
  const user = sanitizeUser(rawUser.user)
  const payload: AuthActionPayload = {
    user,
    error: undefined,
  }
  dispatch({
    payload,
    type: actionTypes.LOGIN_SUCCESS,
  })
}

export default setLocalUserData
