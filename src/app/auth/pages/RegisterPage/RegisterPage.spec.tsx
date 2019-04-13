import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, fireEvent, render, wait } from 'react-testing-library'

import { AppContext, IAppContext } from 'app/core/AppIndex/App.context'
import { mockUsers } from 'packages/pseudo/src/static'

import RegisterPage, { RegisterPageProps } from './RegisterPage'

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

let defaultProps: RegisterPageProps

describe('RegisterPage', () => {
  let overrideContext: IAppContext

  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      getAuthRequestPending: jest.fn(),
      history: { push: jest.fn() } as any,
      register: jest.fn(),
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
        const { container } = renderWithContext(
          <RegisterPage {...defaultProps} />,
          overrideContext,
        )
        expect(container.querySelectorAll('form')).toHaveLength(1)
      })
    })

    describe('Interactivity', () => {
      it('navigates to "login" page when link is clicked', () => {
        const { getByText } = renderWithContext(
          <RegisterPage {...defaultProps} />,
          overrideContext,
        )
        expect(getByText(/sign in to your account/i)).toBeInTheDocument()
        fireEvent.click(getByText(/sign in to your account/i))
        expect(defaultProps.history.push).toHaveBeenCalledTimes(1)
        expect(defaultProps.history.push).toHaveBeenCalledWith('/account/login')
      })

      it('correctly calls "register" on the service, and redirects to "authors" page', async () => {
        const { getByLabelText, getByText } = renderWithContext(
          <RegisterPage {...defaultProps} />,
          overrideContext,
        )

        const testEmail = 'awesomeemail@email.com'
        const testPassword = 'password'
        const { history, register } = defaultProps
        expect(register).toHaveBeenCalledTimes(0)
        fireEvent.change(getByLabelText(/Email/i), {
          target: { value: testEmail },
        })
        fireEvent.change(getByLabelText(/Password/i), {
          target: { value: testPassword },
        })
        fireEvent.change(getByLabelText(/Confirm Password/i), {
          target: { value: testPassword },
        })
        fireEvent.click(getByText(/Submit/i))

        await wait(() => {
          expect(register).toHaveBeenCalledTimes(1)
          expect(register).toHaveBeenCalledWith(testEmail, testPassword)
          expect(history.push).toHaveBeenCalledTimes(1)
          expect(history.push).toHaveBeenCalledWith('/authors')
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
        const { container } = renderWithContext(
          <RegisterPage {...defaultProps} />,
          overrideContext,
        )
        expect(container.firstChild).toBeNull()
      })

      it('redirects to "books" page', () => {
        renderWithContext(<RegisterPage {...defaultProps} />, overrideContext)
        const { push } = defaultProps.history
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/books')
      })
    })
  })
})
