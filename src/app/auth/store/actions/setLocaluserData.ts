import { actionTypes, AuthActionPayload } from '../auth.reducers'

const setLocalUserData = user => async (dispatch, getState) => {
  console.log(
    `%csetLocalUserData`,
    'color:green;font-size:12px;background:lightyellow;padding:2px 4px;',
  )
  const existingUser = getState().auth.data
  if (existingUser.id) {
    console.log(
      `%cuser already stored in Redux...`,
      'color:green;font-size:12px;background:lightyellow;padding:2px 4px;',
    )
    return
  }

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
