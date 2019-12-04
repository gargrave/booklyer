import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent } from '@testing-library/react'

import { mockUsers, mockAuthors, mockBooks } from 'packages/mocks/src/static'
import { renderWithAppContext } from 'utils/testHelpers'

import { HomePage, HomePageProps } from './HomePage'
import { IAppContext } from '../../AppIndex/App.context'

let defaultProps: HomePageProps

describe('HomePage', () => {
  let overrideContext: Partial<IAppContext>

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
      const { getByText } = renderWithAppContext(<HomePage {...defaultProps} />)
      expect(getByText(/Bookly/i)).toBeInTheDocument()
    })
  })

  describe('Authenticated', () => {
    beforeEach(() => {
      overrideContext = {
        appInitialized: true,
        user: mockUsers[0],
      }
    })

    describe('Basic Rendering', () => {
      it('renders correctly', () => {
        const { container, queryAllByText } = renderWithAppContext(
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
    beforeEach(() => {
      overrideContext = {
        appInitialized: true,
      }
    })

    describe('Basic Rendering', () => {
      it('renders correctly', () => {
        const { container, getAllByText } = renderWithAppContext(
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
      const { getByText } = renderWithAppContext(
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
      const { getByText } = renderWithAppContext(
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
