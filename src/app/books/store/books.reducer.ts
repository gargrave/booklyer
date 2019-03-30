import produce from 'immer'

import { ReduxAction, ReduxActionPayload } from 'app/core/core.types'
import { FbError } from 'utils/firebase.types'

import { actionTypes as authActionTypes } from 'app/auth/store/auth.reducer'
import { BookIdMap } from '../books.types'

export const actionTypes = {
  CREATE_BOOK: 'BOOKS/CREATE_BOOK',
  CREATE_BOOK_FAILURE: 'BOOKS/CREATE_BOOK_FAILURE',
  CREATE_BOOK_SUCCESS: 'BOOKS/CREATE_BOOK_SUCCESS',

  FETCH_BOOKS: 'BOOKS/FETCH_BOOKS',
  FETCH_BOOKS_FAILURE: 'BOOKS/FETCH_BOOKS_FAILURE',
  FETCH_BOOKS_SUCCESS: 'BOOKS/FETCH_BOOKS_SUCCESS',

  UPDATE_BOOK: 'BOOKS/UPDATE_BOOK',
  UPDATE_BOOK_FAILURE: 'BOOKS/UPDATE_BOOK_FAILURE',
  UPDATE_BOOK_SUCCESS: 'BOOKS/UPDATE_BOOK_SUCCESS',
}

export type BooksActionPayload = {
  books: BookIdMap
} & ReduxActionPayload

export type BooksState = {
  data: BookIdMap
  error?: FbError
  requestPending: boolean
}

export const defaultState = (): BooksState => ({
  data: {} as BookIdMap,
  error: undefined,
  requestPending: false,
})

export const booksReducer = (
  state: BooksState = defaultState(),
  action: ReduxAction<BooksActionPayload>,
) =>
  produce(state, draft => {
    switch (action.type) {
      case actionTypes.CREATE_BOOK:
      case actionTypes.FETCH_BOOKS:
      case actionTypes.UPDATE_BOOK:
        draft.requestPending = true
        return

      case actionTypes.CREATE_BOOK_SUCCESS:
      case actionTypes.UPDATE_BOOK_SUCCESS:
        draft.data = {
          ...draft.data,
          ...action.payload.books,
        }
        draft.error = undefined
        draft.requestPending = false
        return

      case actionTypes.FETCH_BOOKS_SUCCESS:
        draft.data = action.payload.books
        draft.error = undefined
        draft.requestPending = false
        return

      case actionTypes.CREATE_BOOK_FAILURE:
      case actionTypes.FETCH_BOOKS_FAILURE:
      case actionTypes.UPDATE_BOOK_FAILURE:
        draft.error = action.payload.error
        draft.requestPending = false
        return

      // clear all data on logout
      case authActionTypes.LOGOUT_SUCCESS:
        draft.data = {}
        draft.error = undefined
        draft.requestPending = false
        return
    }
  })
