import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render } from 'react-testing-library'

import { mockAuthors } from 'utils/mocks/static/authors'
import { mockUsers } from 'utils/mocks/static/users'

import AuthorsListPage, { AuthorsListPageProps } from './AuthorsListPage'

// mock "userRequiredAuthentication" with mock getUser implementation
const mockGetUser = jest.fn()
jest.mock('app/auth/utils/useRequiredAuthentication', () => {
  return {
    useRequiredAuthentication: () => ({
      getUser: mockGetUser,
    }),
  }
})

let defaultProps: AuthorsListPageProps

describe('AuthorsListPage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      fetchAuthors: jest.fn(),
      getAuthors: jest.fn(() => mockAuthors),
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
        const { getByText } = render(<AuthorsListPage {...defaultProps} />)

        // renders title and "Add" button
        expect(getByText(/My Authors/i)).toBeInTheDocument()
        expect(getByText(/Add an Author/i)).toBeInTheDocument()
        // renders all provided authors
        mockAuthors.forEach(author => {
          expect(getByText(new RegExp(author.lastName))).toBeInTheDocument()
        })
      })
    })

    describe('Data Handling', () => {
      it('does not call "fetchAuthors" when it has a populated "authors" prop', () => {
        render(<AuthorsListPage {...defaultProps} />)
        expect(defaultProps.fetchAuthors).not.toHaveBeenCalled()
      })

      it('calls "fetchAuthors" with userId when it does not receive any authors', () => {
        const getAuthors = jest.fn(() => [])
        render(<AuthorsListPage {...defaultProps} getAuthors={getAuthors} />)
        expect(defaultProps.fetchAuthors).toHaveBeenCalledTimes(1)
        expect(defaultProps.fetchAuthors).toHaveBeenCalledWith(mockUsers[0].id)
      })
    })
  })

  describe('Not Authenticated', () => {
    beforeEach(() => {
      mockGetUser.mockImplementation(() => null)
    })

    describe('Basic Rendering', () => {
      it('renders nothing when not logged in', () => {
        const { container } = render(<AuthorsListPage {...defaultProps} />)
        expect(container.firstChild).toBeNull()
      })
    })
  })
})
