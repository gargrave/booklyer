import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, fireEvent, render } from 'react-testing-library'

import { AppContext, IAppContext } from 'app/core/AppIndex/App.context'
import { bucketizer } from 'utils/bucketizer'
import { mockBooks, mockUsers } from 'utils/mocks/static'
import { Book } from '../books.types'

import BooksListPage, { BooksListPageProps } from './BooksListPage'

const defaultContext = {
  appInitialized: false,
  logout: jest.fn(),
  user: undefined,
}

const renderWithContext = (children, overrideContext = {}) =>
  render(
    <AppContext.Provider value={{ ...defaultContext, ...overrideContext }}>
      {children}
    </AppContext.Provider>,
  )

const mockGetBucketedBooks = () =>
  bucketizer<Book>(mockBooks, () => 0, book => book.author.lastName)

let defaultProps: BooksListPageProps

describe('BooksListPage', () => {
  let overrideContext: IAppContext

  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      getBucketedBooks: jest.fn(mockGetBucketedBooks),
      getBooksRequestPending: jest.fn(),
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
        const { getByText } = renderWithContext(
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
        const { getByText } = renderWithContext(
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
        const { container } = renderWithContext(
          <BooksListPage {...defaultProps} />,
          overrideContext,
        )
        expect(container.firstChild).toBeNull()
      })

      it('redirects to login page', () => {
        renderWithContext(<BooksListPage {...defaultProps} />, overrideContext)
        const { push } = defaultProps.history
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/account/login')
      })
    })
  })
})