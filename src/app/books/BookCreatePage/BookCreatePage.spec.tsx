import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, fireEvent, render, wait } from 'react-testing-library'

import { mockAuthors, mockUsers } from 'utils/mocks/static'

import BookCreatePage, { BookCreatePageProps } from './BookCreatePage'

// mock "userRequiredAuthentication" with mock getUser implementation
const mockGetUser = jest.fn()
jest.mock('app/auth/utils/useRequiredAuthentication', () => {
  return {
    useRequiredAuthentication: () => ({
      getUser: mockGetUser,
    }),
  }
})

let defaultProps: BookCreatePageProps

describe('BookCreatePage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      createBook: jest.fn(),
      fetchBooks: jest.fn(),
      getAuthorsSortedByLastName: jest.fn(() => mockAuthors),
      getBookById: jest.fn(),
      getBooks: jest.fn(),
      getBooksRequestPending: jest.fn(),
      getBucketedBooks: jest.fn(),
      history: {
        push: jest.fn(),
      },
      updateBook: jest.fn(),
    }
  })

  afterEach(cleanup)

  describe('Authenticated', () => {
    let user = mockUsers[0]

    beforeEach(() => {
      mockGetUser.mockImplementation(() => user)
    })

    describe('Basic Rendering', () => {
      it('renders correctly', () => {
        const { container } = render(<BookCreatePage {...defaultProps} />)
        expect(container.firstChild).not.toBeNull()
      })
    })

    describe('Interactivity', () => {
      it('handles form "cancel" action', () => {
        const { getByText } = render(<BookCreatePage {...defaultProps} />)

        // should redirect back to "books list" page when cancelled
        expect(defaultProps.history.push).toHaveBeenCalledTimes(0)
        fireEvent.click(getByText(/Cancel/i))
        expect(defaultProps.createBook).toHaveBeenCalledTimes(0)
        expect(defaultProps.history.push).toHaveBeenCalledTimes(1)
        expect(defaultProps.history.push).toHaveBeenCalledWith('/books')
      })

      it('handles form "confirm" action correctly', async () => {
        const { getByLabelText, getByText } = render(
          <BookCreatePage {...defaultProps} />,
        )
        const testPayload = {
          author: mockAuthors[0].id,
          sortBy: 'sort',
          title: 'book title',
        }

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
        expect(defaultProps.createBook).toHaveBeenCalledTimes(1)
        expect(defaultProps.createBook).toHaveBeenCalledWith(
          user.id,
          testPayload,
        )
        // should redirect back to "books list" page upon success
        await wait(() =>
          expect(defaultProps.history.push).toHaveBeenCalledTimes(1),
        )
        expect(defaultProps.history.push).toHaveBeenCalledWith('/books')
      })
    })
  })

  describe('Not Authenticated', () => {
    beforeEach(() => {
      mockGetUser.mockImplementation(() => null)
    })

    describe('Basic Rendering', () => {
      it('renders nothing when not logged in', () => {
        const { container } = render(<BookCreatePage {...defaultProps} />)
        expect(container.firstChild).toBeNull()
      })
    })
  })
})
