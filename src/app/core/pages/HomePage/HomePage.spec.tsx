import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, fireEvent, render } from 'react-testing-library'

import { AppContext } from 'app/core/AppIndex/App.context'
import { mockUsers, mockAuthors, mockBooks } from 'packages/mocks/src/static'

import HomePage, { HomePageProps } from './HomePage'

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

let defaultProps: HomePageProps

describe('HomePage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      getAuthors: jest.fn(() => mockAuthors),
      getBooks: jest.fn(() => mockBooks),
      history: {
        push: jest.fn(),
      } as any,
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('always renders the app title', () => {
      const { getByText } = render(<HomePage {...defaultProps} />)
      expect(getByText(/Bookly/i)).toBeInTheDocument()
    })
  })

  describe('Authenticated', () => {
    let overrideContext

    beforeEach(() => {
      overrideContext = {
        ...defaultContext,
        user: mockUsers[0],
      }
    })

    describe('Basic Rendering', () => {
      it('renders correctly', () => {
        const { container, queryAllByText } = renderWithContext(
          <HomePage {...defaultProps} />,
          overrideContext,
        )
        // does not render login/signup link buttons
        expect(container.querySelectorAll('button')).toHaveLength(0)
        expect(queryAllByText(/^Login$/i)).toHaveLength(0)
        expect(queryAllByText(/^Register$/i)).toHaveLength(0)
      })
    })
  })

  describe('Not Authenticated', () => {
    let overrideContext

    beforeEach(() => {
      overrideContext = { ...defaultContext }
    })

    describe('Basic Rendering', () => {
      it('renders correctly', () => {
        const { container, getAllByText } = renderWithContext(
          <HomePage {...defaultProps} />,
          overrideContext,
        )
        // renders login/signup link buttons
        expect(container.querySelectorAll('button')).toHaveLength(2)
        expect(getAllByText(/^Login$/i)).toHaveLength(1)
        expect(getAllByText(/^Register$/i)).toHaveLength(1)
      })
    })

    it('redirects to login page when button is clicked', () => {
      const { getByText } = renderWithContext(
        <HomePage {...defaultProps} />,
        overrideContext,
      )
      const { push } = defaultProps.history
      expect(push).toHaveBeenCalledTimes(0)
      fireEvent.click(getByText(/^Login$/i))
      expect(push).toHaveBeenCalledTimes(1)
      expect(push).toHaveBeenCalledWith('/account/login')
    })

    it('redirects to register page when button is clicked', () => {
      const { getByText } = renderWithContext(
        <HomePage {...defaultProps} />,
        overrideContext,
      )
      const { push } = defaultProps.history
      expect(push).toHaveBeenCalledTimes(0)
      fireEvent.click(getByText(/^Register$/i))
      expect(push).toHaveBeenCalledTimes(1)
      expect(push).toHaveBeenCalledWith('/account/register')
    })
  })
})
