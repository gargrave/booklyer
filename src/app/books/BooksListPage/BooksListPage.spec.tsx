import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, fireEvent, render } from 'react-testing-library'

import { Book } from '../books.types'
import { bucketizer } from 'utils/bucketizer'
import { mockBooks, mockUsers } from 'utils/mocks/static'

import BooksListPage, { BooksListPageProps } from './BooksListPage'

// mock "useRequiredAuthentication" with mock getUser implementation
const mockGetUser = jest.fn()
jest.mock('app/auth/utils/useRequiredAuthentication', () => {
  return {
    useRequiredAuthentication: () => ({
      getUser: mockGetUser,
    }),
  }
})

const mockGetBucketedBooks = () =>
  bucketizer<Book>(mockBooks, () => 0, book => book.author.lastName)

let defaultProps: BooksListPageProps

describe('BooksListPage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      createBook: jest.fn(),
      fetchBooks: jest.fn(),
      getBooks: jest.fn(() => mockBooks),
      getBucketedBooks: jest.fn(mockGetBucketedBooks),
      getBooksRequestPending: jest.fn(),
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
        const { getByText } = render(<BooksListPage {...defaultProps} />)

        // renders title and "Add" button
        expect(getByText(/My Books/i)).toBeInTheDocument()
        expect(getByText(/Add a Book/i)).toBeInTheDocument()
        // renders all provided books
        mockBooks.forEach(book => {
          expect(getByText(book.title)).toBeInTheDocument()
        })
      })
    })

    describe('Interactivity', () => {
      it('navigates to a Book Detail page when the corresponding card is clicked', () => {
        const { getByText } = render(<BooksListPage {...defaultProps} />)
        const book = mockBooks[0]
        const bookCard = getByText(book.title)
        const push = defaultProps.history.push

        expect(bookCard).toBeInTheDocument()
        expect(push).toHaveBeenCalledTimes(0)
        fireEvent.click(bookCard)
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith(`/books/${book.id}`)
      })
    })
  })

  xdescribe('Not Authenticated', () => {
    beforeEach(() => {
      mockGetUser.mockImplementation(() => null)
    })

    describe('Basic Rendering', () => {
      it('renders nothing when not logged in', () => {
        const { container } = render(<BooksListPage {...defaultProps} />)
        expect(container.firstChild).toBeNull()
      })
    })
  })
})
