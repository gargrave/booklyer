import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, fireEvent, render, wait } from 'react-testing-library'

import { AppContext, IAppContext } from 'app/core/AppIndex/App.context'
import { mockAuthors, mockUsers } from 'packages/pseudo/src/static'

import BookCreatePage, { BookCreatePageProps } from './BookCreatePage'

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

let defaultProps: BookCreatePageProps

describe('BookCreatePage', () => {
  let overrideContext: IAppContext

  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      createBook: jest.fn(),
      getAuthorsSortedByLastName: jest.fn(() => mockAuthors),
      getBooksRequestPending: jest.fn(),
      history: { push: jest.fn() } as any,
    }
  })

  afterEach(cleanup)

  describe('Authenticated', () => {
    let user = mockUsers[0]

    beforeEach(() => {
      overrideContext = { appInitialized: true, user }
    })

    describe('Basic Rendering', () => {
      it('renders correctly', () => {
        const { container } = renderWithContext(
          <BookCreatePage {...defaultProps} />,
          overrideContext,
        )
        expect(container.firstChild).not.toBeNull()
      })
    })

    describe('Interactivity', () => {
      it('handles form "cancel" action', () => {
        const { getByText } = renderWithContext(
          <BookCreatePage {...defaultProps} />,
          overrideContext,
        )

        // should redirect back to "books list" page when cancelled
        expect(defaultProps.history.push).toHaveBeenCalledTimes(0)
        fireEvent.click(getByText(/Cancel/i))
        expect(defaultProps.createBook).toHaveBeenCalledTimes(0)
        expect(defaultProps.history.push).toHaveBeenCalledTimes(1)
        expect(defaultProps.history.push).toHaveBeenCalledWith('/books')
      })

      it('handles form "confirm" action correctly', async () => {
        const { getByLabelText, getByText } = renderWithContext(
          <BookCreatePage {...defaultProps} />,
          overrideContext,
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
      overrideContext = {
        appInitialized: true,
        logout: jest.fn(),
        user: undefined,
      }
    })

    describe('Basic Rendering', () => {
      it('renders nothing when not logged in', () => {
        const { container } = renderWithContext(
          <BookCreatePage {...defaultProps} />,
          overrideContext,
        )
        expect(container.firstChild).toBeNull()
      })
    })
  })
})
