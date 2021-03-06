import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent } from '@testing-library/react'

import { IAppContext } from 'app/core/AppIndex/App.context'
import { Book } from 'app/books/books.types'
import { mockBooks, mockUsers } from 'packages/mocks/src/static'
import { bucketizer } from 'utils/bucketizer'
import { renderWithAppContext } from 'utils/testHelpers'

import { BooksListPage, BooksListPageProps } from './BooksListPage'

const mockGetBucketedBooks = () => {
  const getKey = (book: Book) =>
    `${book.author.firstName} ${book.author.lastName}`
  return bucketizer<Book>(mockBooks, () => 0, getKey)
}

let defaultProps: BooksListPageProps

describe('BooksListPage', () => {
  let overrideContext: IAppContext

  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      getBooksRequestPending: jest.fn(),
      getBucketedBooks: jest.fn(mockGetBucketedBooks),
      history: { push: jest.fn() } as any,
    }
  })

  afterEach(cleanup)

  describe('Authenticated', () => {
    beforeEach(() => {
      overrideContext = {
        appInitialized: true,
        logout: jest.fn(),
        user: mockUsers[0],
      }
    })

    describe('Basic Rendering', () => {
      it('renders correctly', () => {
        const { getByText } = renderWithAppContext(
          <BooksListPage {...defaultProps} />,
          overrideContext,
        )

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
        const { getByText } = renderWithAppContext(
          <BooksListPage {...defaultProps} />,
          overrideContext,
        )
        const book = mockBooks[0]
        const bookCard = getByText(book.title)
        const push = defaultProps.history.push

        expect(bookCard).toBeInTheDocument()
        expect(push).toHaveBeenCalledTimes(0)
        fireEvent.click(bookCard)
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith(`/books/${book.id}`)
      })

      it('navigates to an Author Details page when the corresponding link is clicked', () => {
        const { getByText } = renderWithAppContext(
          <BooksListPage {...defaultProps} />,
          overrideContext,
        )
        const author = mockBooks[0].author
        const authorKey = `${author.firstName} ${author.lastName}`
        const authorBucketHeader = getByText(authorKey)
        const push = defaultProps.history.push

        expect(push).toHaveBeenCalledTimes(0)
        expect(authorBucketHeader).toBeInTheDocument()
        fireEvent.click(authorBucketHeader)
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith(`/authors/${author.id}`)
      })
    })
  })

  describe('Not Authenticated', () => {
    beforeEach(() => {
      overrideContext = {
        appInitialized: true,
        logout: jest.fn(),
        user: undefined,
      }
    })

    describe('Basic Rendering', () => {
      it('renders nothing when not logged in', () => {
        const { container } = renderWithAppContext(
          <BooksListPage {...defaultProps} />,
          overrideContext,
        )
        expect(container.firstChild).toBeNull()
      })

      it('redirects to login page', () => {
        renderWithAppContext(
          <BooksListPage {...defaultProps} />,
          overrideContext,
        )
        const { push } = defaultProps.history
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/account/login')
      })
    })
  })
})
