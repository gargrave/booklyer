import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, fireEvent, render } from 'react-testing-library'

import { mockAuthors } from 'utils/mocks/static/authors'
import { mockUsers } from 'utils/mocks/static/users'

import AuthorsListPage, { AuthorsListPageProps } from './AuthorsListPage'
import { bucketizer } from 'utils/bucketizer'

// mock "useRequiredAuthentication" with mock getUser implementation
const mockGetUser = jest.fn()
jest.mock('app/auth/utils/useRequiredAuthentication', () => {
  return {
    useRequiredAuthentication: () => ({
      getUser: mockGetUser,
    }),
  }
})

const mockGetBucketedAuthors = () =>
  bucketizer(mockAuthors, () => 0, author => author.lastName[0])

let defaultProps: AuthorsListPageProps

describe('AuthorsListPage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      createAuthor: jest.fn(),
      fetchAuthors: jest.fn(),
      getAuthors: jest.fn(() => mockAuthors),
      getBucketedAuthors: jest.fn(mockGetBucketedAuthors),
      getAuthorsRequestPending: jest.fn(),
      history: {
        push: jest.fn(),
      },
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

    describe('Interactivity', () => {
      it('navigates to an Author Detail page when the corresponding card is clicked', () => {
        const { getByText } = render(<AuthorsListPage {...defaultProps} />)
        const author = mockAuthors[0]
        const authorCard = getByText(new RegExp(author.lastName))
        const push = defaultProps.history.push

        expect(authorCard).toBeInTheDocument()
        expect(push).toHaveBeenCalledTimes(0)
        fireEvent.click(authorCard)
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith(`/authors/${author.id}`)
      })
    })

    describe('Data Handling', () => {
      it('does not call "fetchAuthors" when it has a populated "authors" prop', () => {
        render(<AuthorsListPage {...defaultProps} />)
        expect(defaultProps.fetchAuthors).not.toHaveBeenCalled()
      })

      it('calls "fetchAuthors" with userId when it does not receive any authors', () => {
        const getBucketedAuthors = jest.fn(() => [])
        render(
          <AuthorsListPage
            {...defaultProps}
            getBucketedAuthors={getBucketedAuthors}
          />,
        )
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
