import { ReduxAction } from 'app/core/types'

import { Author } from '../authors.types'

import types from './actionTypes'

export type AuthorsState = {
  data: Author[]
  requestPending: boolean
}

const defaultState = (): AuthorsState => ({
  data: [],
  requestPending: false,
})

const reducers = (
  state: AuthorsState = defaultState(),
  action: ReduxAction,
) => {
  switch (action.type) {
    case types.CREATE_AUTHOR:
      console.log('Reducer: CREATE_AUTHOR')
      return state

    case types.CREATE_AUTHOR_SUCCESS:
      console.log('Reducer: CREATE_AUTHOR_SUCCESS')
      return state

    case types.CREATE_AUTHOR_FAILURE:
      console.log('Reducer: CREATE_AUTHOR_FAILURE')
      return state

    case types.FETCH_AUTHORS_SUCCESS:
      return { ...state, data: [...action.payload] }
    default:
      return state
  }
}

export default reducers
