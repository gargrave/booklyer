import { ReduxAction } from 'app/core/types'

import { Book } from '../books.types'

import types from './actionTypes'

export type BooksState = {
  data: Book[]
  requestPending: boolean
}

const defaultState = (): BooksState => ({
  data: [],
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

    case types.FETCH_BOOKS_SUCCESS:
      return { ...state, data: [...action.payload] }

    default:
      return state
  }
}

export default reducers
