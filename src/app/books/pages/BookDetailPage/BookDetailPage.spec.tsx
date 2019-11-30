import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render, fireEvent, wait } from '@testing-library/react'

import { AppContext, IAppContext } from 'app/core/AppIndex/App.context'
import { mockAuthors, mockBooks, mockUsers } from 'packages/mocks/src/static'

import BookDetailPage, { BookDetailPageProps } from './BookDetailPage'

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
let defaultProps: BookDetailPageProps

describe('BookDetailPage', () => {
  let overrideContext: IAppContext

  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      deleteBook: jest.fn(),
      getAuthorsSortedByLastName: jest.fn(() => mockAuthors),
      getBookById: jest.fn(() => mockBooks[0]),
      getBooksRequestPending: jest.fn(),
      history: { push: jest.fn() } as any,
      match: {
        params: { id: '0' },
      } as any,
      updateBook: jest.fn(),
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
        const { container, getByText } = renderWithContext(
          <BookDetailPage {...defaultProps} />,
          overrideContext,
        )
        // no form is rendered by default
        expect(container.querySelectorAll('form')).toHaveLength(0)
        expect(container.querySelectorAll('.loaderWrapper')).toHaveLength(0)
        expect(getByText(mockBooks[0].title)).toBeInTheDocument()
      })

      it('renders a loader when "loading" prop is true', () => {
        const mock = jest.fn(() => true)
        const { container } = renderWithContext(
          <BookDetailPage
            {...defaultProps}
            getBookById={jest.fn(() => undefined)}
            getBooksRequestPending={mock}
          />,
          overrideContext,
        )
        expect(container.querySelectorAll('.loaderWrapper')).toHaveLength(1)
      })
    })

    describe('Interactivity', () => {
      it('defaults to non-editing state', () => {
        const { getByText, queryByText } = renderWithContext(
          <BookDetailPage {...defaultProps} />,
          overrideContext,
        )
        expect(getByText(/Back/i)).toBeInTheDocument()
        expect(getByText(/Edit/i)).toBeInTheDocument()
        expect(queryByText(/Cancel/i)).not.toBeInTheDocument()
        expect(queryByText(/Submit/i)).not.toBeInTheDocument()
      })

      it('navigates when "Back" button is clicked', () => {
        const { getByText } = renderWithContext(
          <BookDetailPage {...defaultProps} />,
          overrideContext,
        )
        const cb = defaultProps.history.push
        expect(cb).toHaveBeenCalledTimes(0)
        fireEvent.click(getByText(/Back/i))
        expect(cb).toHaveBeenCalledTimes(1)
        expect(cb).toHaveBeenCalledWith('/books')
      })

      it('toggles editing state when "Edit" button is clicked', () => {
        const {
          container,
          getByLabelText,
          getByText,
          queryByText,
        } = renderWithContext(
          <BookDetailPage {...defaultProps} />,
          overrideContext,
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
        const { getByLabelText, getByText } = renderWithContext(
          <BookDetailPage {...defaultProps} />,
          overrideContext,
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

    it('correctly makes a calls to delete the author', async () => {
      const { getByText } = renderWithContext(
        <BookDetailPage {...defaultProps} />,
        overrideContext,
      )
      const { deleteBook, history } = defaultProps

      fireEvent.click(getByText(/Edit/i))
      fireEvent.click(getByText(/Delete/i))
      expect(deleteBook).toHaveBeenCalledTimes(0)
      expect(history.push).toHaveBeenCalledTimes(0)
      fireEvent.click(getByText(/Click to Confirm/i))

      await wait(() => {
        expect(deleteBook).toHaveBeenCalledTimes(1)
        expect(deleteBook).toHaveBeenCalledWith(user.id, mockBooks[0])
        expect(history.push).toHaveBeenCalledTimes(1)
        expect(history.push).toHaveBeenCalledWith('/books')
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
          <BookDetailPage {...defaultProps} />,
          overrideContext,
        )
        expect(container.firstChild).toBeNull()
      })

      it('redirects to login page', () => {
        renderWithContext(<BookDetailPage {...defaultProps} />, overrideContext)
        const { push } = defaultProps.history
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/account/login')
      })
    })
  })
})
