import { FbError } from 'utils/firebase.types'

export type ReduxActionPayload = {
  error?: FbError
}

export type ReduxAction<T> = {
  payload: T
  type: string
}
