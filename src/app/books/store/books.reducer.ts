import produce from 'immer'
import get from 'lodash/get'

import { Author } from 'app/authors/authors.types'
import { ReduxAction, ReduxActionPayload } from 'app/core/core.types'
import { FbError } from 'utils/firebase.types'

import { actionTypes as authActionTypes } from 'app/auth/store/auth.reducer'
import { BookIdMap } from '../books.types'

export const actionTypes = {
  CREATE_BOOK: 'BOOKS/CREATE_BOOK',
  CREATE_BOOK_FAILURE: 'BOOKS/CREATE_BOOK_FAILURE',
  CREATE_BOOK_SUCCESS: 'BOOKS/CREATE_BOOK_SUCCESS',

  DELETE_BOOK: 'BOOKS/DELETE_BOOK',
  DELETE_BOOK_FAILURE: 'BOOKS/DELETE_BOOK_FAILURE',
  DELETE_BOOK_SUCCESS: 'BOOKS/DELETE_BOOK_SUCCESS',

  DELETE_BOOKS_BY_AUTHOR: 'BOOKS/DELETE_BOOKS_BY_AUTHOR',
  DELETE_BOOKS_BY_AUTHOR_FAILURE: 'BOOKS/DELETE_BOOKS_BY_AUTHOR_FAILURE',
  DELETE_BOOKS_BY_AUTHOR_SUCCESS: 'BOOKS/DELETE_BOOKS_BY_AUTHOR_SUCCESS',

  FETCH_BOOKS: 'BOOKS/FETCH_BOOKS',
  FETCH_BOOKS_FAILURE: 'BOOKS/FETCH_BOOKS_FAILURE',
  FETCH_BOOKS_SUCCESS: 'BOOKS/FETCH_BOOKS_SUCCESS',

  UPDATE_BOOK: 'BOOKS/UPDATE_BOOK',
  UPDATE_BOOK_FAILURE: 'BOOKS/UPDATE_BOOK_FAILURE',
  UPDATE_BOOK_SUCCESS: 'BOOKS/UPDATE_BOOK_SUCCESS',
}

export type BooksActionPayload = {
  author?: Author
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
      case actionTypes.DELETE_BOOK:
      case actionTypes.DELETE_BOOKS_BY_AUTHOR:
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

      case actionTypes.DELETE_BOOK_SUCCESS:
        Object.values(action.payload.books).forEach(
          deletedBook => delete draft.data[deletedBook.id],
        )
        draft.error = undefined
        draft.requestPending = false
        return

      case actionTypes.DELETE_BOOKS_BY_AUTHOR_SUCCESS:
        const booksByAuthor = Object.values(state.data).filter(
          book => book.authorId === get(action, 'payload.author.id'),
        )
        booksByAuthor.forEach(book => delete draft.data[book.id])
        draft.error = undefined
        draft.requestPending = false
        return

      case actionTypes.FETCH_BOOKS_SUCCESS:
        draft.data = action.payload.books
        draft.error = undefined
        draft.requestPending = false
        return

      case actionTypes.CREATE_BOOK_FAILURE:
      case actionTypes.DELETE_BOOK_FAILURE:
      case actionTypes.DELETE_BOOKS_BY_AUTHOR_FAILURE:
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
