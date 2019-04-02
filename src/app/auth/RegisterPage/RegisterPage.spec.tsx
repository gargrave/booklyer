import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render } from 'react-testing-library'

import { AppContext, IAppContext } from 'app/core/AppIndex/App.context'
import { mockUsers } from 'utils/mocks/static'

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
      it.todo('navigates to "login" page when link is clicked')

      it.todo(
        'correctly calls "register" on the service, and redirects to "books" page',
      )

      it.todo(
        'correctly displays an error message when the API returns an error',
      )
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
