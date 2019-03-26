import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render, wait } from 'react-testing-library'

import { mockUsers } from 'utils/mocks/static'

import AppIndex, { AppIndexProps } from './AppIndex'

// mock "useAuthentication" with mock getUser implementation
const mockGetUser = jest.fn()
jest.mock('app/auth/utils/useAuthentication', () => {
  return {
    useAuthentication: () => ({
      authInitialized: true,
      getUser: mockGetUser,
    }),
  }
})

let defaultProps: AppIndexProps

describe('AppIndex', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      fetchBooks: jest.fn(),
      setLocalUserData: jest.fn(),
    }
  })

  afterEach(cleanup)

  describe('Authenticated', () => {
    const user = mockUsers[0]

    beforeEach(() => {
      mockGetUser.mockImplementation(() => user)
    })

    describe('Basic Rendering', () => {
      it('renders correctly', () => {
        const { getByText } = render(<AppIndex {...defaultProps} />)
        expect(getByText(/Bookly/i)).toBeInTheDocument()
      })
    })

    describe('Data handling', () => {
      it('makes API calls as expected when it has a valid user', async () => {
        render(<AppIndex {...defaultProps} />)
        await wait(() => {
          expect(defaultProps.setLocalUserData).toHaveBeenCalledTimes(1)
          expect(defaultProps.setLocalUserData).toHaveBeenCalledWith(user)
          expect(defaultProps.fetchBooks).toHaveBeenCalledTimes(1)
          expect(defaultProps.fetchBooks).toHaveBeenCalledWith(user.id)
        })
      })
    })
  })

  describe('Not Authenticated', () => {
    beforeEach(() => {
      mockGetUser.mockImplementation(() => ({}))
    })

    it('does not make API calls when user is not logged in', async () => {
      render(<AppIndex {...defaultProps} />)
      await wait(() => {
        expect(defaultProps.setLocalUserData).toHaveBeenCalledTimes(1)
        expect(defaultProps.setLocalUserData).toHaveBeenCalledWith({})
        expect(defaultProps.fetchBooks).toHaveBeenCalledTimes(0)
      })
    })
  })
})
