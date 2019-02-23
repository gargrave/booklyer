import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render } from 'react-testing-library'

import { mockUsers } from 'utils/mocks/static/users'

import AuthorCreatePage, { AuthorCreatePageProps } from './AuthorCreatePage'

// mock "userRequiredAuthentication" with mock getUser implementation
const mockGetUser = jest.fn()
jest.mock('app/auth/utils/useRequiredAuthentication', () => {
  return {
    useRequiredAuthentication: () => ({
      getUser: mockGetUser,
    }),
  }
})

let defaultProps: AuthorCreatePageProps

describe('AuthorCreatePage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      fetchAuthors: jest.fn(),
      getAuthors: jest.fn(),
      history: {},
    }
  })

  afterEach(cleanup)

  describe('Authenticated', () => {
    beforeEach(() => {
      mockGetUser.mockImplementation(() => mockUsers[0])
    })

    describe('Basic Rendering', () => {
      it('renders correctly', () => {
        const { container } = render(<AuthorCreatePage {...defaultProps} />)
        expect(container.firstChild).not.toBeNull()
      })
    })
  })

  describe('Not Authenticated', () => {
    beforeEach(() => {
      mockGetUser.mockImplementation(() => null)
    })

    describe('Basic Rendering', () => {
      it('renders nothing when not logged in', () => {
        const { container } = render(<AuthorCreatePage {...defaultProps} />)
        expect(container.firstChild).toBeNull()
      })
    })
  })
})
