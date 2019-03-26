import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render, fireEvent, wait } from 'react-testing-library'

import { mockUsers, mockAuthors } from 'utils/mocks/static'

import AuthorDetailPage, { AuthorDetailPageProps } from './AuthorDetailPage'

// mock "useRequiredAuthentication" with mock getUser implementation
const mockGetUser = jest.fn()
jest.mock('app/auth/utils/useRequiredAuthentication', () => {
  return {
    useRequiredAuthentication: () => ({
      getUser: mockGetUser,
    }),
  }
})

let defaultProps: AuthorDetailPageProps

describe('AuthorDetailPage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      createAuthor: jest.fn(),
      fetchAuthors: jest.fn(),
      getAuthorById: jest.fn(() => mockAuthors[0]),
      getAuthors: jest.fn(),
      getBucketedAuthors: jest.fn(),
      getAuthorsRequestPending: jest.fn(),
      history: {
        push: jest.fn(),
      },
      match: {
        params: {
          id: '0',
        },
      },
      updateAuthor: jest.fn(),
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
        const { container, getByText } = render(
          <AuthorDetailPage {...defaultProps} />,
        )
        const authorName = `${mockAuthors[0].firstName} ${
          mockAuthors[0].lastName
        }`
        // no form is rendered by default
        expect(container.querySelectorAll('form')).toHaveLength(0)
        expect(container.querySelectorAll('.loaderWrapper')).toHaveLength(0)
        expect(getByText(authorName)).toBeInTheDocument()
      })

      it('renders a loader when "loading" prop is true', () => {
        const mock = jest.fn(() => true)
        const { container } = render(
          <AuthorDetailPage
            {...defaultProps}
            getAuthorById={jest.fn(() => undefined)}
            getAuthorsRequestPending={mock}
          />,
        )
        expect(container.querySelectorAll('.loaderWrapper')).toHaveLength(1)
      })
    })

    describe('Interactivity', () => {
      it('defaults to non-editing state', () => {
        const { getByText, queryByText } = render(
          <AuthorDetailPage {...defaultProps} />,
        )
        expect(getByText(/Back/i)).toBeInTheDocument()
        expect(getByText(/Edit/i)).toBeInTheDocument()
        expect(queryByText(/Cancel/i)).not.toBeInTheDocument()
        expect(queryByText(/Submit/i)).not.toBeInTheDocument()
      })

      it('navigates when "Back" button is clicked', () => {
        const { getByText } = render(<AuthorDetailPage {...defaultProps} />)
        const cb = defaultProps.history.push
        expect(cb).toHaveBeenCalledTimes(0)
        fireEvent.click(getByText(/Back/i))
        expect(cb).toHaveBeenCalledTimes(1)
        expect(cb).toHaveBeenCalledWith('/authors')
      })

      it('toggles editing state when "Edit" button is clicked', () => {
        const { container, getByLabelText, getByText, queryByText } = render(
          <AuthorDetailPage {...defaultProps} />,
        )
        fireEvent.click(getByText(/Edit/i))
        expect(queryByText(/Back/i)).not.toBeInTheDocument()
        expect(queryByText(/Edit/i)).not.toBeInTheDocument()
        expect(getByText(/Cancel/i)).toBeInTheDocument()
        expect(getByText(/Submit/i)).toBeInTheDocument()
        expect(container.querySelectorAll('form')).toHaveLength(1)
        expect(getByLabelText(/First Name/i)).toBeInTheDocument()
        expect(getByLabelText(/Last Name/i)).toBeInTheDocument()
      })

      it('handles form "confirm" action correctly', async () => {
        const { getByLabelText, getByText } = render(
          <AuthorDetailPage {...defaultProps} />,
        )
        const testPayload = {
          ...mockAuthors[0],
          firstName: 'billy',
          lastName: 'pickles',
        }

        fireEvent.click(getByText(/Edit/i))
        // populate required values in form to ensure it will pass validation and submit
        fireEvent.change(getByLabelText(/First Name/i), {
          target: { value: testPayload.firstName },
        })
        fireEvent.change(getByLabelText(/Last Name/i), {
          target: { value: testPayload.lastName },
        })
        expect(defaultProps.history.push).toHaveBeenCalledTimes(0)
        fireEvent.click(getByText(/Submit/i))
        expect(defaultProps.updateAuthor).toHaveBeenCalledTimes(1)
        expect(defaultProps.updateAuthor).toHaveBeenCalledWith(
          user.id,
          testPayload,
        )
      })
    })
  })

  describe('Not Authenticated', () => {
    beforeEach(() => {
      mockGetUser.mockImplementation(() => null)
    })

    describe('Basic Rendering', () => {
      it('renders nothing when not logged in', () => {
        const { container } = render(<AuthorDetailPage {...defaultProps} />)
        expect(container.firstChild).toBeNull()
      })
    })
  })
})
