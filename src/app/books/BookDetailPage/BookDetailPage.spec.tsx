import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render, fireEvent, wait } from 'react-testing-library'

import { mockAuthors, mockBooks, mockUsers } from 'utils/mocks/static'

import BookDetailPage, { BookDetailPageProps } from './BookDetailPage'

// mock "useRequiredAuthentication" with mock getUser implementation
const mockGetUser = jest.fn()
jest.mock('app/auth/utils/useRequiredAuthentication', () => {
  return {
    useRequiredAuthentication: () => ({
      getUser: mockGetUser,
    }),
  }
})

let defaultProps: BookDetailPageProps

describe('BookDetailPage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      createBook: jest.fn(),
      fetchBooks: jest.fn(),
      getAuthorsSortedByLastName: jest.fn(() => mockAuthors),
      getBookById: jest.fn(() => mockBooks[0]),
      getBooks: jest.fn(),
      getBucketedBooks: jest.fn(),
      getBooksRequestPending: jest.fn(),
      history: {
        push: jest.fn(),
      },
      match: {
        params: {
          id: '0',
        },
      },
      updateBook: jest.fn(),
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
          <BookDetailPage {...defaultProps} />,
        )
        // no form is rendered by default
        expect(container.querySelectorAll('form')).toHaveLength(0)
        expect(container.querySelectorAll('.loaderWrapper')).toHaveLength(0)
        expect(getByText(mockBooks[0].title)).toBeInTheDocument()
      })

      it('renders a loader when "loading" prop is true', () => {
        const mock = jest.fn(() => true)
        const { container } = render(
          <BookDetailPage
            {...defaultProps}
            getBookById={jest.fn(() => undefined)}
            getBooksRequestPending={mock}
          />,
        )
        expect(container.querySelectorAll('.loaderWrapper')).toHaveLength(1)
      })
    })

    describe('Interactivity', () => {
      it('defaults to non-editing state', () => {
        const { getByText, queryByText } = render(
          <BookDetailPage {...defaultProps} />,
        )
        expect(getByText(/Back/i)).toBeInTheDocument()
        expect(getByText(/Edit/i)).toBeInTheDocument()
        expect(queryByText(/Cancel/i)).not.toBeInTheDocument()
        expect(queryByText(/Submit/i)).not.toBeInTheDocument()
      })

      it('navigates when "Back" button is clicked', () => {
        const { getByText } = render(<BookDetailPage {...defaultProps} />)
        const cb = defaultProps.history.push
        expect(cb).toHaveBeenCalledTimes(0)
        fireEvent.click(getByText(/Back/i))
        expect(cb).toHaveBeenCalledTimes(1)
        expect(cb).toHaveBeenCalledWith('/books')
      })

      it('toggles editing state when "Edit" button is clicked', () => {
        const { container, getByLabelText, getByText, queryByText } = render(
          <BookDetailPage {...defaultProps} />,
        )
        fireEvent.click(getByText(/Edit/i))
        expect(queryByText(/Back/i)).not.toBeInTheDocument()
        expect(queryByText(/Edit/i)).not.toBeInTheDocument()
        expect(getByText(/Cancel/i)).toBeInTheDocument()
        expect(getByText(/Submit/i)).toBeInTheDocument()
        expect(container.querySelectorAll('form')).toHaveLength(1)
        expect(getByLabelText(/Title/i)).toBeInTheDocument()
        expect(getByLabelText(/Author/i)).toBeInTheDocument()
        expect(getByLabelText(/Sort By/i)).toBeInTheDocument()
      })

      it('handles form "confirm" action correctly', async () => {
        const { getByLabelText, getByText } = render(
          <BookDetailPage {...defaultProps} />,
        )
        const testPayload = {
          ...mockBooks[0],
          author: mockAuthors[0].id,
          sortBy: 'sort',
          title: 'book title',
        }

        fireEvent.click(getByText(/Edit/i))
        // populate required values in form to ensure it will pass validation and submit
        fireEvent.change(getByLabelText(/Title/i), {
          target: { value: testPayload.title },
        })
        fireEvent.change(getByLabelText(/Author/i), {
          target: { value: testPayload.author },
        })
        fireEvent.change(getByLabelText(/Sort By/i), {
          target: { value: testPayload.sortBy },
        })
        expect(defaultProps.history.push).toHaveBeenCalledTimes(0)
        fireEvent.click(getByText(/Submit/i))
        expect(defaultProps.updateBook).toHaveBeenCalledTimes(1)
        expect(defaultProps.updateBook).toHaveBeenCalledWith(
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
        const { container } = render(<BookDetailPage {...defaultProps} />)
        expect(container.firstChild).toBeNull()
      })
    })
  })
})
