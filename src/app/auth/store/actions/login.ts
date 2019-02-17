import { User } from '../../auth.types'
import { sanitizeUser } from '../../utils/sanitizeUser'
import { actionTypes, AuthActionPayload } from '../auth.reducers'
import service from '../auth.service'

import setLocalUserData from './setLocalUserData'

const login = (email: string, password: string) => async dispatch => {
  dispatch({ type: actionTypes.LOGIN })

  const payload: AuthActionPayload = {
    error: undefined,
    user: {} as User,
  }

  try {
    const rawUser = await service.login(email, password)
    dispatch(setLocalUserData(sanitizeUser(rawUser.user)))
  } catch (err) {
    const hydratedError = { ...err, message: err.message }
    payload.error = hydratedError

    dispatch({
      payload,
      type: actionTypes.LOGIN_FAILURE,
    })
    throw Error
  }
}

export default login
