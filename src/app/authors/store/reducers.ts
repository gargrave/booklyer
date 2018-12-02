import { IReduxAction } from 'app/core/types'

import { mockAuthors } from 'api/mocks/authors.mocks'

import { IAuthor } from '../types'

import types from './actionTypes'

export interface IAuthorsState {
  data: IAuthor[]
  requestPending: boolean
}

const defaultState = (): IAuthorsState => ({
  data: [...mockAuthors],
  requestPending: false,
})

const reducers = (
  state: IAuthorsState = defaultState(),
  action: IReduxAction,
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
    default:
      return state
  }
}

export default reducers
