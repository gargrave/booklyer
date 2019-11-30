import '@testing-library/jest-dom/extend-expect'

import { actionTypes as authActionTypes } from 'app/auth/store/auth.reducer'
import { FbError } from 'utils/firebase.types'
import { mockAuthors } from 'packages/mocks/src/static/authors'

import {
  actionTypes,
  authorsReducer,
  AuthorsState,
  defaultState,
} from './authors.reducer'

describe('Authors Reducers', () => {
  describe('initial state', () => {
    it('returns the default state by default', () => {
      const action = {
        type: '',
        payload: '',
      }

      const expected: AuthorsState = defaultState()
      const actual = authorsReducer(undefined, action as any)
      expect(actual).toEqual(expected)
    })
  })

  describe('initial action types', () => {
    it('handles the CREATE_AUTHOR action correctly', () => {
      const action = {
        type: actionTypes.CREATE_AUTHOR,
        payload: null,
      }

      const expected: AuthorsState = {
        ...defaultState(),
        requestPending: true,
      }
      const actual = authorsReducer(undefined, action as any)
      expect(actual).toEqual(expected)
    })

    it('handles the FETCH_AUTHORS action correctly', () => {
      const action = {
        type: actionTypes.FETCH_AUTHORS,
        payload: null,
      }

      const expected: AuthorsState = {
        ...defaultState(),
        requestPending: true,
      }
      const actual = authorsReducer(undefined, action as any)
      expect(actual).toEqual(expected)
    })

    it('handles the UPDATE_AUTHOR action correctly', () => {
      const action = {
        type: actionTypes.UPDATE_AUTHOR,
        payload: null,
      }

      const expected: AuthorsState = {
        ...defaultState(),
        requestPending: true,
      }
      const actual = authorsReducer(undefined, action as any)
      expect(actual).toEqual(expected)
    })

    it('handles the DELETE_AUTHOR action correctly', () => {
      const action = {
        type: actionTypes.DELETE_AUTHOR,
        payload: null,
      }

      const expected: AuthorsState = {
        ...defaultState(),
        requestPending: true,
      }
      const actual = authorsReducer(undefined, action as any)
      expect(actual).toEqual(expected)
    })
  })

  describe('success action types', () => {
    let error: FbError
    let previousState: AuthorsState

    beforeEach(() => {
      error = {
        code: 'error-code',
        message: 'Hello, this is an error message!',
        name: 'error-name',
      }

      previousState = {
        data: {
          [mockAuthors[0].id]: mockAuthors[0],
          [mockAuthors[1].id]: mockAuthors[1],
        },
        // set a previous error state to ensure it gets cleared
        error,
        // set the "pending" flag to ensure it gets cleared
        requestPending: true,
      }
    })

    it('handles FETCH_AUTHORS_SUCCESS correctly', () => {
      // should:
      // - overwrite all author data with the new ones
      // - disable the "pending" flag
      // - clear any existing errors
      const action = {
        type: actionTypes.FETCH_AUTHORS_SUCCESS,
        payload: {
          authors: {
            [mockAuthors[2].id]: mockAuthors[2],
            [mockAuthors[3].id]: mockAuthors[3],
          },
        },
      }

      const expected: AuthorsState = {
        data: {
          [mockAuthors[2].id]: mockAuthors[2],
          [mockAuthors[3].id]: mockAuthors[3],
        },
        error: undefined,
        requestPending: false,
      }
      const actual = authorsReducer(previousState, action)
      expect(actual).toEqual(expected)
    })

    it('handles CREATE_AUTHOR_SUCCESS correctly', () => {
      // should:
      // - append the new author to the existing ones
      // - disable the "pending" flag
      // - clear any existing errors
      const action = {
        type: actionTypes.CREATE_AUTHOR_SUCCESS,
        payload: {
          authors: {
            [mockAuthors[2].id]: mockAuthors[2],
          },
        },
      }

      const expected: AuthorsState = {
        data: {
          [mockAuthors[0].id]: mockAuthors[0],
          [mockAuthors[1].id]: mockAuthors[1],
          [mockAuthors[2].id]: mockAuthors[2],
        },
        error: undefined,
        requestPending: false,
      }
      const actual = authorsReducer(previousState, action)
      expect(actual).toEqual(expected)
    })

    it('handles UPDATE_AUTHOR_SUCCESS correctly', () => {
      // should:
      // - replace the existing author in the local store
      // - disable the "pending" flag
      // - clear any existing errors
      const updatedAuthor = {
        ...mockAuthors[2],
        lastName: '_updated_',
      }
      const action = {
        type: actionTypes.UPDATE_AUTHOR_SUCCESS,
        payload: {
          authors: {
            [mockAuthors[2].id]: updatedAuthor,
          },
        },
      }
      const expected: AuthorsState = {
        data: {
          [mockAuthors[0].id]: mockAuthors[0],
          [mockAuthors[1].id]: mockAuthors[1],
          [mockAuthors[2].id]: updatedAuthor,
        },
        error: undefined,
        requestPending: false,
      }
      const actual = authorsReducer(previousState, action)
      expect(actual).toEqual(expected)
    })

    it('handles DELETE_AUTHOR_SUCCESS correctly', () => {
      // should:
      // - remove the existing author from local state
      // - disable the "pending" flag
      // - clear any existing errors
      const authorToDelete = mockAuthors[0]
      const action = {
        type: actionTypes.DELETE_AUTHOR_SUCCESS,
        payload: {
          authors: {
            [authorToDelete.id]: authorToDelete,
          },
        },
      }
      const expected: AuthorsState = {
        data: {
          [mockAuthors[1].id]: mockAuthors[1],
        },
        error: undefined,
        requestPending: false,
      }
      const actual = authorsReducer(previousState, action)
      expect(actual).toEqual(expected)
    })

    it('clears all data on AUTH/LOGOUT_SUCCESS', () => {
      const action = { type: authActionTypes.LOGOUT_SUCCESS }
      const expected = defaultState()
      const actual = authorsReducer(previousState, action as any)
      expect(actual).toEqual(expected)
    })
  })

  describe('error action types', () => {
    let error: FbError
    let previousState: AuthorsState
    let expectedState: AuthorsState

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

    it('handles the CREATE_AUTHOR_FAILURE action correctly', () => {
      const action = {
        type: actionTypes.CREATE_AUTHOR_FAILURE,
        payload: { error },
      }
      const actual = authorsReducer(previousState, action as any)
      expect(actual).toEqual(expectedState)
    })

    it('handles the FETCH_AUTHORS_FAILURE action correctly', () => {
      const action = {
        type: actionTypes.FETCH_AUTHORS_FAILURE,
        payload: { error },
      }
      const actual = authorsReducer(previousState, action as any)
      expect(actual).toEqual(expectedState)
    })

    it('handles the UPDATE_AUTHOR_FAILURE action correctly', () => {
      const action = {
        type: actionTypes.UPDATE_AUTHOR_FAILURE,
        payload: { error },
      }
      const actual = authorsReducer(previousState, action as any)
      expect(actual).toEqual(expectedState)
    })

    it('handles the DELETE_AUTHOR_FAILURE action correctly', () => {
      const action = {
        type: actionTypes.DELETE_AUTHOR_FAILURE,
        payload: { error },
      }
      const actual = authorsReducer(previousState, action as any)
      expect(actual).toEqual(expectedState)
    })
  })
})
