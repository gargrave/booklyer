import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, fireEvent, render, wait } from 'react-testing-library'

import { AppContext, IAppContext } from 'app/core/AppIndex/App.context'
import { mockUsers } from 'utils/mocks/static'

import AuthorCreatePage, { AuthorCreatePageProps } from './AuthorCreatePage'

const defaultContext = {
  appInitialized: false,
  user: undefined,
}

const renderWithContext = (children, overrideContext = {}) =>
  render(
    <AppContext.Provider value={{ ...defaultContext, ...overrideContext }}>
      {children}
    </AppContext.Provider>,
  )

let defaultProps: AuthorCreatePageProps

describe('AuthorCreatePage', () => {
  let overrideContext: IAppContext

  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      createAuthor: jest.fn(),
      fetchAuthors: jest.fn(),
      getAuthorById: jest.fn(),
      getAuthors: jest.fn(),
      getAuthorsRequestPending: jest.fn(),
      getBucketedAuthors: jest.fn(),
      history: {
        push: jest.fn(),
      } as any,
      updateAuthor: jest.fn(),
    }
  })

  afterEach(cleanup)

  describe('Authenticated', () => {
    let user = mockUsers[0]

    beforeEach(() => {
      overrideContext = { appInitialized: true, user: mockUsers[0] }
    })

    describe('Basic Rendering', () => {
      it('renders correctly', () => {
        const { container } = renderWithContext(
          <AuthorCreatePage {...defaultProps} />,
          overrideContext,
        )
        expect(container.firstChild).not.toBeNull()
      })
    })

    describe('Interactivity', () => {
      it('handles form "cancel" action', () => {
        const { getByText } = renderWithContext(
          <AuthorCreatePage {...defaultProps} />,
          overrideContext,
        )
        // should redirect back to "authors list" page when cancelled
        expect(defaultProps.history.push).toHaveBeenCalledTimes(0)
        fireEvent.click(getByText(/Cancel/i))
        expect(defaultProps.createAuthor).toHaveBeenCalledTimes(0)
        expect(defaultProps.history.push).toHaveBeenCalledTimes(1)
        expect(defaultProps.history.push).toHaveBeenCalledWith('/authors')
      })

      it('handles form "confirm" action correctly', async () => {
        const { getByLabelText, getByText } = renderWithContext(
          <AuthorCreatePage {...defaultProps} />,
          overrideContext,
        )
        const testPayload = {
          firstName: 'billy',
          lastName: 'pickles',
        }
        // populate required values in form to ensure it will pass validation and submit
        fireEvent.change(getByLabelText(/First Name/i), {
          target: { value: testPayload.firstName },
        })
        fireEvent.change(getByLabelText(/Last Name/i), {
          target: { value: testPayload.lastName },
        })
        expect(defaultProps.history.push).toHaveBeenCalledTimes(0)
        fireEvent.click(getByText(/Submit/i))
        expect(defaultProps.createAuthor).toHaveBeenCalledTimes(1)
        expect(defaultProps.createAuthor).toHaveBeenCalledWith(
          user.id,
          testPayload,
        )
        // should redirect back to "authors list" page upon success
        await wait(() =>
          expect(defaultProps.history.push).toHaveBeenCalledTimes(1),
        )
        expect(defaultProps.history.push).toHaveBeenCalledWith('/authors')
      })
    })
  })

  describe('Not Authenticated', () => {
    beforeEach(() => {
      overrideContext = { appInitialized: true, user: undefined }
    })

    describe('Basic Rendering', () => {
      it('renders nothing when not logged in', () => {
        const { container } = renderWithContext(
          <AuthorCreatePage {...defaultProps} />,
          overrideContext,
        )
        expect(container.firstChild).toBeNull()
      })
    })
  })
})
