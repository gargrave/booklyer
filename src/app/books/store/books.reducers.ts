import produce from 'immer'

import { ReduxAction } from 'app/core/types'
import { FbError } from 'utils/firebase.types'

import { Book } from '../books.types'

export const actionTypes = {
  CREATE_BOOK: 'BOOKS/CREATE_BOOK',
  CREATE_BOOK_FAILURE: 'BOOKS/CREATE_BOOK_FAILURE',
  CREATE_BOOK_SUCCESS: 'BOOKS/CREATE_BOOK_SUCCESS',

  FETCH_BOOKS: 'BOOKS/FETCH_BOOKS',
  FETCH_BOOKS_FAILURE: 'BOOKS/FETCH_BOOKS_FAILURE',
  FETCH_BOOKS_SUCCESS: 'BOOKS/FETCH_BOOKS_SUCCESS',
}

export type BooksState = {
  data: object
  error?: FbError
  requestPending: boolean
}

const defaultState = (): BooksState => ({
  data: {},
  error: undefined,
  requestPending: false,
})

const reducers = (state: BooksState = defaultState(), action: ReduxAction) =>
  produce(state, draft => {
    switch (action.type) {
      case actionTypes.CREATE_BOOK:
      case actionTypes.FETCH_BOOKS:
        draft.requestPending = true
        return

      case actionTypes.CREATE_BOOK_SUCCESS:
        console.log('Reducer: CREATE_BOOK_SUCCESS')
        draft.requestPending = false
        return

      case actionTypes.CREATE_BOOK_FAILURE:
        console.log('Reducer: CREATE_BOOK_FAILURE')
        draft.requestPending = false
        return

      case actionTypes.FETCH_BOOKS_FAILURE:
        draft.error = action.payload
        draft.requestPending = false
        return

      case actionTypes.FETCH_BOOKS_SUCCESS:
        draft.data = action.payload.books
        draft.error = undefined
        draft.requestPending = false
        return
    }
  })

export default reducers
