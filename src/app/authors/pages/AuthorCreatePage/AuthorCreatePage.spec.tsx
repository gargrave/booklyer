import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, wait } from '@testing-library/react'

import { IAppContext } from 'app/core/AppIndex/App.context'
import { mockUsers } from 'packages/mocks/src/static'
import { renderWithAppContext } from 'utils/testHelpers'

import { AuthorCreatePage, AuthorCreatePageProps } from './AuthorCreatePage'

let defaultProps: AuthorCreatePageProps

describe('AuthorCreatePage', () => {
  let overrideContext: IAppContext

  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      createAuthor: jest.fn(),
      getAuthorsRequestPending: jest.fn(),
      history: { push: jest.fn() } as any,
    }
  })

  afterEach(cleanup)

  describe('Authenticated', () => {
    const user = mockUsers[0]

    beforeEach(() => {
      overrideContext = { appInitialized: true, user } as any
    })

    describe('Basic Rendering', () => {
      it('renders correctly', () => {
        const { container } = renderWithAppContext(
          <AuthorCreatePage {...defaultProps} />,
          overrideContext,
        )
        expect(container.firstChild).not.toBeNull()
      })
    })

    describe('Interactivity', () => {
      it('handles form "cancel" action', () => {
        const { getByText } = renderWithAppContext(
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
        const { getByLabelText, getByText } = renderWithAppContext(
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
      overrideContext = {
        appInitialized: true,
        logout: jest.fn(),
        user: undefined,
      }
    })

    describe('Basic Rendering', () => {
      it('renders nothing when not logged in', () => {
        const { container } = renderWithAppContext(
          <AuthorCreatePage {...defaultProps} />,
          overrideContext,
        )

        expect(container.firstChild).toBeNull()
      })

      it('redirects to login page', () => {
        const { push } = defaultProps.history
        renderWithAppContext(
          <AuthorCreatePage {...defaultProps} />,
          overrideContext,
        )

        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/account/login')
      })
    })
  })
})
