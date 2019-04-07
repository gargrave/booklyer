import 'jest-dom/extend-expect'

import { FbError } from 'utils/firebase.types'
import { mockUsers } from 'packages/pseudo/src/static'

import {
  actionTypes,
  authReducer,
  AuthState,
  defaultState,
} from './auth.reducer'
import { User } from '../auth.types'

describe('Auth Reducers', () => {
  describe('initial state', () => {
    it('returns the default state by default', () => {
      const action = {
        type: '',
        payload: '',
      }

      const expected: AuthState = defaultState()
      const actual = authReducer(undefined, action as any)
      expect(actual).toEqual(expected)
    })
  })

  describe('initial action types', () => {
    it('handles the LOGIN action correctly', () => {
      const action = {
        type: actionTypes.LOGIN,
        payload: null,
      }

      const expected: AuthState = {
        ...defaultState(),
        requestPending: true,
      }
      const actual = authReducer(undefined, action as any)
      expect(actual).toEqual(expected)
    })

    it('handles the REGISTER action correctly', () => {
      const action = {
        type: actionTypes.REGISTER,
        payload: null,
      }

      const expected: AuthState = {
        ...defaultState(),
        requestPending: true,
      }
      const actual = authReducer(undefined, action as any)
      expect(actual).toEqual(expected)
    })
  })

  describe('success action types', () => {
    let error: FbError
    let previousState: AuthState

    beforeEach(() => {
      error = {
        code: 'error-code',
        message: 'Hello, this is an error message!',
        name: 'error-name',
      }

      previousState = {
        data: {} as User,
        // set a previous error state to ensure it gets cleared
        error,
        // set the "pending" flag to ensure it gets cleared
        requestPending: true,
      }
    })

    it('correctly handles the LOGIN_SUCCESS action', () => {
      const action = {
        type: actionTypes.LOGIN_SUCCESS,
        payload: { user: mockUsers[0] },
      }
      const expected: AuthState = {
        ...defaultState(),
        data: mockUsers[0],
      }
      const actual = authReducer(previousState, action as any)
      expect(actual).toEqual(expected)
    })

    it('corectly handles the LOGOUT_SUCCESS action', () => {
      const prevStateWithUser: AuthState = {
        ...previousState,
        data: mockUsers[0],
      }
      const action = {
        type: actionTypes.LOGOUT_SUCCESS,
      }
      const actual = authReducer(prevStateWithUser, action as any)
      expect(actual).toEqual(defaultState())
    })

    it('corectly handles the REGISTER_SUCESS action', () => {
      const prevStateWithUser: AuthState = {
        ...previousState,
        data: mockUsers[0],
      }
      const action = {
        type: actionTypes.REGISTER_SUCCESS,
      }
      const actual = authReducer(prevStateWithUser, action as any)
      expect(actual).toEqual(defaultState())
    })
  })

  describe('error action types', () => {
    let error: FbError
    let previousState: AuthState
    let expectedState: AuthState

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

    it('handles the LOGIN_FAILURE action correctly', () => {
      const action = {
        type: actionTypes.LOGIN_FAILURE,
        payload: { error },
      }
      const actual = authReducer(previousState, action as any)
      expect(actual).toEqual(expectedState)
    })

    it('handles the REGISTER_FAILURE action correctly', () => {
      const action = {
        type: actionTypes.REGISTER_FAILURE,
        payload: { error },
      }
      const actual = authReducer(previousState, action as any)
      expect(actual).toEqual(expectedState)
    })
  })
})
