import { ReduxAction } from 'app/core/types'

import { Author } from '../authors.types'

export const actionTypes = {
  CREATE_AUTHOR: 'AUTHORS/CREATE_AUTHOR',
  CREATE_AUTHOR_FAILURE: 'AUTHORS/CREATE_AUTHOR_FAILURE',
  CREATE_AUTHOR_SUCCESS: 'AUTHORS/CREATE_AUTHOR_SUCCESS',

  FETCH_AUTHORS: 'AUTHORS/FETCH_AUTHORS',
  FETCH_AUTHORS_FAILURE: 'AUTHORS/FETCH_AUTHORS_FAILURE',
  FETCH_AUTHORS_SUCCESS: 'AUTHORS/FETCH_AUTHORS_SUCCESS',
}

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
    case actionTypes.CREATE_AUTHOR:
      console.log('Reducer: CREATE_AUTHOR')
      return state

    case actionTypes.CREATE_AUTHOR_SUCCESS:
      console.log('Reducer: CREATE_AUTHOR_SUCCESS')
      return state

    case actionTypes.CREATE_AUTHOR_FAILURE:
      console.log('Reducer: CREATE_AUTHOR_FAILURE')
      return state

    case actionTypes.FETCH_AUTHORS_SUCCESS:
      return { ...state, data: [...action.payload] }

    default:
      return state
  }
}

export default reducers
