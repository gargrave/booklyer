import pick from 'lodash/pick'

import { actionTypes, AuthActionPayload } from '../auth.reducers'
import service from '../auth.service'
import {
  User,
  UserMetadata,
  UserMetadataPropertyNames,
  UserPropertyNames,
} from '../../auth.types'

const login = (email: string, password: string) => async dispatch => {
  dispatch({ type: actionTypes.LOGIN })

  const payload: AuthActionPayload = {
    error: undefined,
    user: {} as User,
  }

  try {
    // NOTE: we are processing the user data here instead of the selector
    // because Firebase users come with a lot of extra junk data that we do not want to store
    const rawUser = await service.login(email, password)
    const userData = { ...pick(rawUser.user, UserPropertyNames) }
    const userMeta: UserMetadata = {
      ...pick(rawUser.user.metadata, UserMetadataPropertyNames),
    }
    const user = {
      ...userData,
      ...userMeta,
    }

    // // for consistency's sake, rename 'uid' to 'id'
    user.id = user.uid
    delete user.uid

    payload.user = user

    dispatch({
      payload,
      type: actionTypes.LOGIN_SUCCESS,
    })
  } catch (err) {
    const hydratedError = { ...err, message: err.message }
    payload.error = hydratedError

    dispatch({
      payload,
      type: actionTypes.LOGIN_FAILURE,
    })
  }
}

export default login
