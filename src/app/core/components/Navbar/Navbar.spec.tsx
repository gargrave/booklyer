import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import 'jest-dom/extend-expect'
import { cleanup, render } from 'react-testing-library'

import { AppContext, IAppContext } from 'app/core/AppIndex/App.context'
import { mockUsers } from 'packages/pseudo/src/static'

import Navbar, { NavbarProps } from './Navbar'

const defaultContext = {
  appInitialized: true,
  logout: jest.fn(),
  user: undefined,
}

const renderWithContext = (children, overrideContext = {}) =>
  render(
    <BrowserRouter>
      <AppContext.Provider value={{ ...defaultContext, ...overrideContext }}>
        {children}
      </AppContext.Provider>
    </BrowserRouter>,
  )

let defaultProps: NavbarProps

describe('Navbar', () => {
  let overrideContext: IAppContext

  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {}
  })

  afterEach(cleanup)

  describe('Authenticated', () => {
    beforeEach(() => {
      overrideContext = {
        ...defaultContext,
        user: mockUsers[0],
      }
    })

    describe('Basic Rendering', () => {
      it('renders the correct set of links', () => {
        const { getByText, queryByText } = renderWithContext(
          <Navbar {...defaultProps} />,
          overrideContext,
        )
        expect(getByText(/^Books$/i)).toBeInTheDocument()
        expect(getByText(/^Authors$/i)).toBeInTheDocument()
        expect(getByText(/^Account$/i)).toBeInTheDocument()
        expect(queryByText(/^Login$/i)).not.toBeInTheDocument()
        expect(queryByText(/^Register$/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('Not authenticated', () => {
    beforeEach(() => {
      overrideContext = {
        ...defaultContext,
        user: undefined,
      }
    })

    it('renders the correct set of links', () => {
      const { getByText, queryByText } = renderWithContext(
        <Navbar {...defaultProps} />,
        overrideContext,
      )
      expect(queryByText(/^Books$/i)).not.toBeInTheDocument()
      expect(queryByText(/^Authors$/i)).not.toBeInTheDocument()
      expect(queryByText(/^Account$/i)).not.toBeInTheDocument()
      expect(getByText(/^Login$/i)).toBeInTheDocument()
      expect(getByText(/^Register$/i)).toBeInTheDocument()
    })
  })
})
