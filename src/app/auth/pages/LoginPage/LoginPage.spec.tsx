import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, wait } from '@testing-library/react'

import { IAppContext } from 'app/core/AppIndex/App.context'
import { mockUsers } from 'packages/mocks/src/static'
import { renderWithAppContext } from 'utils/testHelpers'

import { LoginPage, LoginPageProps } from './LoginPage'

let defaultProps: LoginPageProps

describe('LoginPage', () => {
  let overrideContext: IAppContext

  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      getAuthRequestPending: jest.fn(),
      history: { push: jest.fn() } as any,
      login: jest.fn(),
    }
  })

  afterEach(cleanup)

  describe('Not Authenticated', () => {
    beforeEach(() => {
      overrideContext = {
        appInitialized: true,
        logout: jest.fn(),
        user: undefined,
      }
    })

    describe('Basic Rendering', () => {
      it('renders correctly', () => {
        const { container } = renderWithAppContext(
          <LoginPage {...defaultProps} />,
          overrideContext,
        )
        expect(container.querySelectorAll('form')).toHaveLength(1)
      })
    })

    describe('Interactivity', () => {
      it('navigates to "register" page when link is clicked', () => {
        const { getByText } = renderWithAppContext(
          <LoginPage {...defaultProps} />,
          overrideContext,
        )
        expect(getByText(/create an account/i)).toBeInTheDocument()
        fireEvent.click(getByText(/create an account/i))
        expect(defaultProps.history.push).toHaveBeenCalledTimes(1)
        expect(defaultProps.history.push).toHaveBeenCalledWith(
          '/account/register',
        )
      })

      it('correctly calls "login" on the service and redirects to "books" after login', async () => {
        const { getByLabelText, getByText } = renderWithAppContext(
          <LoginPage {...defaultProps} />,
          overrideContext,
        )

        const testEmail = 'awesomeemail@email.com'
        const testPassword = 'password'
        const { history, login } = defaultProps
        expect(login).toHaveBeenCalledTimes(0)
        fireEvent.change(getByLabelText(/Email/i), {
          target: { value: testEmail },
        })
        fireEvent.change(getByLabelText(/Password/i), {
          target: { value: testPassword },
        })
        fireEvent.click(getByText(/Submit/i))

        await wait(() => {
          expect(login).toHaveBeenCalledTimes(1)
          expect(login).toHaveBeenCalledWith(testEmail, testPassword)
          expect(history.push).toHaveBeenCalledTimes(1)
          expect(history.push).toHaveBeenCalledWith('/books')
        })
      })
    })
  })

  describe('Authenticated', () => {
    beforeEach(() => {
      overrideContext = {
        appInitialized: true,
        logout: jest.fn(),
        user: mockUsers[0],
      }
    })

    describe('Basic Rendering', () => {
      it('renders nothing when not logged in', () => {
        const { container } = renderWithAppContext(
          <LoginPage {...defaultProps} />,
          overrideContext,
        )
        expect(container.firstChild).toBeNull()
      })

      it('redirects to "books" page', () => {
        renderWithAppContext(<LoginPage {...defaultProps} />, overrideContext)
        const { push } = defaultProps.history
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/books')
      })
    })
  })
})
