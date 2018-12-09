import { ReduxAction } from 'app/core/types'

import { mockBooks } from 'api/mocks/books.mocks'

import { Book } from '../types'

import types from './actionTypes'

export type BooksState = {
  data: Book[]
  requestPending: boolean
}

const defaultState = (): BooksState => ({
  data: [...mockBooks],
  requestPending: false,
})

const reducers = (state: BooksState = defaultState(), action: ReduxAction) => {
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
