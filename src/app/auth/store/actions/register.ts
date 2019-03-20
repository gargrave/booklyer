import { User } from '../../auth.types'
import { actionTypes, AuthActionPayload } from '../auth.reducer'
import service from '../auth.service'

const register = (email: string, password: string) => async dispatch => {
  dispatch({ type: actionTypes.REGISTER })

  const payload: AuthActionPayload = {
    error: undefined,
    user: {} as User,
  }

  try {
    await service.register(email, password)
    dispatch({ type: actionTypes.REGISTER_SUCCESS })
  } catch (err) {
    const hydratedError = { ...err, message: err.message }
    payload.error = hydratedError

    dispatch({
      payload,
      type: actionTypes.REGISTER_FAILURE,
    })
    throw new Error(hydratedError)
  }
}

export default register
