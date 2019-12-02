import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, wait } from '@testing-library/react'

import { IAppContext } from 'app/core/AppIndex/App.context'
import { mockAuthors, mockUsers, mockBooks } from 'packages/mocks/src/static'
import { renderWithAppContext } from 'utils/testHelpers'

import { AuthorDetailPage, AuthorDetailPageProps } from './AuthorDetailPage'

const testAuthor = mockAuthors[0]
const testBooks = mockBooks.slice(0, 3)

let defaultProps: AuthorDetailPageProps

describe('AuthorDetailPage', () => {
  let overrideContext: IAppContext

  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      deleteAuthor: jest.fn(),
      getAuthorById: jest.fn(() => testAuthor),
      getAuthorsRequestPending: jest.fn(() => false),
      getBooksByAuthor: jest.fn(() => testBooks),
      history: { push: jest.fn() } as any,
      match: { params: { id: '0' } } as any,
      updateAuthor: jest.fn(),
    }
  })

  afterEach(cleanup)

  describe('Authenticated', () => {
    const user = mockUsers[0]

    beforeEach(() => {
      overrideContext = {
        appInitialized: true,
        logout: jest.fn(),
        user: mockUsers[0],
      }
    })

    describe('Basic Rendering', () => {
      it('renders correctly', () => {
        const { container, getAllByText } = renderWithAppContext(
          <AuthorDetailPage {...defaultProps} />,
          overrideContext,
        )
        const authorName = `${testAuthor.firstName} ${testAuthor.lastName}`

        // no form is rendered by default
        expect(container.querySelectorAll('form')).toHaveLength(0)
        expect(container.querySelectorAll('.loaderWrapper')).toHaveLength(0)
        expect(getAllByText(authorName).length).toBeGreaterThan(0)
      })

      it('renders a loader when "loading" prop is true', () => {
        const mock = jest.fn(() => true)
        const { container } = renderWithAppContext(
          <AuthorDetailPage
            {...defaultProps}
            getAuthorById={jest.fn(() => undefined)}
            getAuthorsRequestPending={mock}
          />,
          overrideContext,
        )
        expect(container.querySelectorAll('.loaderWrapper')).toHaveLength(1)
      })

      it('renders all current books by this author', () => {
        const { getByText } = renderWithAppContext(
          <AuthorDetailPage {...defaultProps} />,
          overrideContext,
        )
        expect(getByText(/Books by .+/i)).toBeInTheDocument()
        testBooks.forEach(book => {
          expect(getByText(book.title)).toBeInTheDocument()
        })
      })
    })

    describe('Interactivity', () => {
      it('defaults to non-editing state', () => {
        const { getByText, queryByText } = renderWithAppContext(
          <AuthorDetailPage {...defaultProps} />,
          overrideContext,
        )

        expect(getByText(/Back/i)).toBeInTheDocument()
        expect(getByText(/Edit/i)).toBeInTheDocument()
        expect(queryByText(/Cancel/i)).not.toBeInTheDocument()
        expect(queryByText(/Submit/i)).not.toBeInTheDocument()
      })

      it('navigates when "Back" button is clicked', () => {
        const cb = defaultProps.history.push
        const { getByText } = renderWithAppContext(
          <AuthorDetailPage {...defaultProps} />,
          overrideContext,
        )

        expect(cb).toHaveBeenCalledTimes(0)
        fireEvent.click(getByText(/Back/i))
        expect(cb).toHaveBeenCalledTimes(1)
        expect(cb).toHaveBeenCalledWith('/authors')
      })

      it.todo('navigates when the "Add Book" button is clicked')

      it('toggles editing state when "Edit" button is clicked', () => {
        const {
          container,
          getByLabelText,
          getByText,
          queryByText,
        } = renderWithAppContext(
          <AuthorDetailPage {...defaultProps} />,
          overrideContext,
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
        const { getByLabelText, getByText } = renderWithAppContext(
          <AuthorDetailPage {...defaultProps} />,
          overrideContext,
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

        await wait(() => {
          expect(defaultProps.history.push).toHaveBeenCalledTimes(0)
        })

        fireEvent.click(getByText(/Submit/i))
        await wait(() => {
          expect(defaultProps.updateAuthor).toHaveBeenCalledTimes(1)
          expect(defaultProps.updateAuthor).toHaveBeenCalledWith(
            user.id,
            testPayload,
          )
        })
      })

      it('correctly makes a calls to delete the author', async () => {
        const { getByText } = renderWithAppContext(
          <AuthorDetailPage {...defaultProps} />,
          overrideContext,
        )
        const { deleteAuthor, history } = defaultProps

        fireEvent.click(getByText(/Edit/i))
        fireEvent.click(getByText(/Delete/i))
        expect(deleteAuthor).toHaveBeenCalledTimes(0)
        expect(history.push).toHaveBeenCalledTimes(0)
        fireEvent.click(getByText(/Click to Confirm/i))

        await wait(() => {
          expect(deleteAuthor).toHaveBeenCalledTimes(1)
          expect(deleteAuthor).toHaveBeenCalledWith(user.id, mockAuthors[0])
          expect(history.push).toHaveBeenCalledTimes(1)
          expect(history.push).toHaveBeenCalledWith('/authors')
        })
      })

      it('navigates to "new book" page when button is clicked', () => {
        const { getByText } = renderWithAppContext(
          <AuthorDetailPage {...defaultProps} />,
          overrideContext,
        )
        const { push } = defaultProps.history
        const btn = getByText(/Add Another Book/i)
        expect(push).toHaveBeenCalledTimes(0)
        fireEvent.click(btn)
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/books/new')
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
          <AuthorDetailPage {...defaultProps} />,
          overrideContext,
        )
        expect(container.firstChild).toBeNull()
      })

      it('redirects to login page', () => {
        renderWithAppContext(
          <AuthorDetailPage {...defaultProps} />,
          overrideContext,
        )
        const { push } = defaultProps.history
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/account/login')
      })
    })
  })
})
