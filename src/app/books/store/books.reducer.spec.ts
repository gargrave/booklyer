import 'jest-dom/extend-expect'

import { ReduxAction } from 'app/core/core.types'
import { FbError } from 'utils/firebase.types'
import { mockBooks } from 'utils/mocks/static/books'

import { actionTypes as authActionTypes } from 'app/auth/store/auth.reducer'
import {
  actionTypes,
  BooksActionPayload,
  booksReducer,
  BooksState,
  defaultState,
} from './books.reducer'

describe('Books Reducers', () => {
  beforeEach(() => {})

  describe('initial state', () => {
    it('returns the default state by default', () => {
      const action = {
        type: '',
        payload: '',
      }

      const expected: BooksState = defaultState()
      const actual = booksReducer(undefined, action as any)
      expect(actual).toEqual(expected)
    })
  })

  describe('initial action types', () => {
    it('handles the CREATE_BOOK action correctly', () => {
      const action = {
        type: actionTypes.CREATE_BOOK,
        payload: null,
      }

      const expected: BooksState = {
        ...defaultState(),
        requestPending: true,
      }
      const actual = booksReducer(undefined, action as any)
      expect(actual).toEqual(expected)
    })

    it('handles the FETCH_BOOKS action correctly', () => {
      const action = {
        type: actionTypes.FETCH_BOOKS,
        payload: null,
      }

      const expected: BooksState = {
        ...defaultState(),
        requestPending: true,
      }
      const actual = booksReducer(undefined, action as any)
      expect(actual).toEqual(expected)
    })

    it('handles the UPDATE_BOOK action correctly', () => {
      const action = {
        type: actionTypes.UPDATE_BOOK,
        payload: null,
      }

      const expected: BooksState = {
        ...defaultState(),
        requestPending: true,
      }
      const actual = booksReducer(undefined, action as any)
      expect(actual).toEqual(expected)
    })
  })

  describe('success action types', () => {
    let error: FbError
    let previousState: BooksState

    beforeEach(() => {
      error = {
        code: 'error-code',
        message: 'Hello, this is an error message!',
        name: 'error-name',
      }

      previousState = {
        data: {
          [mockBooks[0].id]: mockBooks[0],
          [mockBooks[1].id]: mockBooks[1],
        },
        // set a previous error state to ensure it gets cleared
        error,
        // set the "pending" flag to ensure it gets cleared
        requestPending: true,
      }
    })

    it('handles FETCH_BOOKS_SUCCESS correctly', () => {
      // should:
      // - overwrite all book data with the new ones
      // - disable the "pending" flag
      // - clear any existing errors
      const action = {
        type: actionTypes.FETCH_BOOKS_SUCCESS,
        payload: {
          books: {
            [mockBooks[2].id]: mockBooks[2],
            [mockBooks[3].id]: mockBooks[3],
          },
        },
      }

      const expected: BooksState = {
        data: {
          [mockBooks[2].id]: mockBooks[2],
          [mockBooks[3].id]: mockBooks[3],
        },
        error: undefined,
        requestPending: false,
      }
      const actual = booksReducer(previousState, action as any)
      expect(actual).toEqual(expected)
    })

    it('handles CREATE_BOOK_SUCCESS correctly', () => {
      // should:
      // - append the new book to the existing ones
      // - disable the "pending" flag
      // - clear any existing errors
      const action = {
        type: actionTypes.CREATE_BOOK_SUCCESS,
        payload: {
          books: {
            [mockBooks[2].id]: mockBooks[2],
          },
        },
      }

      const expected: BooksState = {
        data: {
          [mockBooks[0].id]: mockBooks[0],
          [mockBooks[1].id]: mockBooks[1],
          [mockBooks[2].id]: mockBooks[2],
        },
        error: undefined,
        requestPending: false,
      }
      const actual = booksReducer(previousState, action as any)
      expect(actual).toEqual(expected)
    })

    it('handles UPDATE_BOOK_SUCCESS correctly', () => {
      // should:
      // - replace the existing book with the new one
      // - disable the "pending" flag
      // - clear any existing errors
      const updatedBook = {
        ...mockBooks[1],
        title: 'The Title Hath Been Updateth',
      }
      const action = {
        type: actionTypes.UPDATE_BOOK_SUCCESS,
        payload: {
          books: {
            [mockBooks[1].id]: updatedBook,
          },
        },
      }

      const expected: BooksState = {
        data: {
          [mockBooks[0].id]: mockBooks[0],
          [mockBooks[1].id]: updatedBook,
        },
        error: undefined,
        requestPending: false,
      }
      const actual = booksReducer(previousState, action as any)
      expect(actual).toEqual(expected)
    })

    it('clears all data on AUTH/LOGOUT_SUCCESS', () => {
      const action = { type: authActionTypes.LOGOUT_SUCCESS }
      const expected = defaultState()
      const actual = booksReducer(previousState, action as any)
      expect(actual).toEqual(expected)
    })
  })

  describe('error action types', () => {
    let error: FbError
    let previousState: BooksState
    let expectedState: BooksState

    beforeEach(() => {
      error = {
        code: 'error-code',
        message: 'Hello, this is an error message!',
        name: 'error-name',
      }
      previousState = {
        ...defaultState(),
        error: undefined,
        requestPending: true,
      }
      expectedState = {
        ...previousState,
        error,
        requestPending: false,
      }
    })

    it('handles the CREATE_BOOK_FAILURE action correctly', () => {
      const action = {
        type: actionTypes.CREATE_BOOK_FAILURE,
        payload: { error },
      }
      const actual = booksReducer(previousState, action as any)
      expect(actual).toEqual(expectedState)
    })

    it('handles the FETCH_BOOKS_FAILURE action correctly', () => {
      const action = {
        type: actionTypes.FETCH_BOOKS_FAILURE,
        payload: { error },
      }
      const actual = booksReducer(previousState, action as any)
      expect(actual).toEqual(expectedState)
    })

    it('handles the UPDATE_BOOK_FAILURE action correctly', () => {
      const action = {
        type: actionTypes.UPDATE_BOOK_FAILURE,
        payload: { error },
      }
      const actual = booksReducer(previousState, action as any)
      expect(actual).toEqual(expectedState)
    })
  })
})
