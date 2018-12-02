import { IReduxAction } from 'app/core/types'

import { mockBooks } from 'api/mocks/books.mocks'

import { IBook } from '../types'

import types from './actionTypes'

export interface IBooksState {
  data: IBook[]
  requestPending: boolean
}

const defaultState = (): IBooksState => ({
  data: [...mockBooks],
  requestPending: false,
})

const reducers = (
  state: IBooksState = defaultState(),
  action: IReduxAction,
) => {
  switch (action.type) {
    case types.CREATE_BOOK:
      console.log('Reducer: CREATE_BOOK')
      return state

    case types.CREATE_BOOK_SUCCESS:
      console.log('Reducer: CREATE_BOOK_SUCCESS')
      return state

    case types.CREATE_BOOK_FAILURE:
      console.log('Reducer: CREATE_BOOK_FAILURE')
      return state
    default:
      return state
  }
}

export default reducers
