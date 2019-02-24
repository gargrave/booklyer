import { User } from '../../auth.types'
import { actionTypes, AuthActionPayload } from '../auth.reducer'
import service from '../auth.service'

const login = (email: string, password: string) => async dispatch => {
  dispatch({ type: actionTypes.LOGIN })

  const payload: AuthActionPayload = {
    error: undefined,
    user: {} as User,
  }

  try {
    await service.login(email, password)
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
