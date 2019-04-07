import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import 'jest-dom/extend-expect'
import { cleanup, render, wait } from 'react-testing-library'

import { AppContext, IAppContext } from './App.context'
import { mockUsers } from 'packages/pseudo/src/static'

import AppContent, { AppContentProps } from './AppContent'

const defaultContext = {
  appInitialized: true,
  logout: jest.fn(),
  user: undefined,
}

const renderWithContext = (children, overrideContext = {}) =>
  render(
    <AppContext.Provider value={{ ...defaultContext, ...overrideContext }}>
      {children}
    </AppContext.Provider>,
  )

let defaultProps: AppContentProps

describe('AppContent', () => {
  let overrideContext: IAppContext

  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      fetchBooks: jest.fn(),
    }
  })

  afterEach(cleanup)

  describe('Authenticated', () => {
    const user = mockUsers[0]

    beforeEach(() => {
      overrideContext = {
        ...defaultContext,
        user,
      }
    })

    describe('Basic Rendering', () => {
      it('renders correctly', () => {
        const { container, getByText } = renderWithContext(
          <AppContent {...defaultProps} />,
          overrideContext,
        )
        expect(getByText(/Bookly/i)).toBeInTheDocument()
        expect(container.querySelector('.loading')).not.toBeInTheDocument()
      })
    })

    describe('Data handling', () => {
      it('makes API calls as expected when it has a valid user', async () => {
        renderWithContext(<AppContent {...defaultProps} />, overrideContext)
        await wait(() => {
          expect(defaultProps.fetchBooks).toHaveBeenCalledTimes(1)
          expect(defaultProps.fetchBooks).toHaveBeenCalledWith(user.id)
        })
      })
    })
  })

  describe('Not Authenticated', () => {
    beforeEach(() => {
      overrideContext = { ...defaultContext }
    })

    it('does not make API calls when user is not logged in', async () => {
      render(<AppContent {...defaultProps} />)
      await wait(() => {
        expect(defaultProps.fetchBooks).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('Not initialized', () => {
    beforeEach(() => {
      overrideContext = {
        ...defaultContext,
        appInitialized: false,
      }
    })

    it('displays a loader while the app is initializing', () => {
      const { container, getByText } = renderWithContext(
        <AppContent {...defaultProps} />,
        overrideContext,
      )
      // ensure the titlebar is still displayed while loading
      expect(getByText(/Bookly/i)).toBeInTheDocument()
      expect(container.querySelector('.loading')).toBeInTheDocument()
    })
  })
})
