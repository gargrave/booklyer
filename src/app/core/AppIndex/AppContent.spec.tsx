import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render, wait } from '@testing-library/react'

import { IAppContext } from './App.context'
import { mockUsers } from 'packages/mocks/src/static'
import {
  defaultAppContext,
  renderWithRedux,
  wrapInAppContext,
} from 'utils/testHelpers'

import AppContent, { AppContentProps } from './AppContent'

const wrappedRender = (children, overrideContext = {}) =>
  renderWithRedux(wrapInAppContext(children, overrideContext))

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
        ...defaultAppContext,
        appInitialized: true,
        user,
      }
    })

    describe('Basic Rendering', () => {
      it('renders correctly', async () => {
        const { container, getAllByText } = wrappedRender(
          <AppContent {...defaultProps} />,
          overrideContext,
        )

        expect(getAllByText(/^Bookly$/i).length).toBeGreaterThan(0)
        expect(container.querySelector('.loading')).not.toBeInTheDocument()
      })
    })

    describe('Data handling', () => {
      it('makes API calls as expected when it has a valid user', async () => {
        wrappedRender(<AppContent {...defaultProps} />, overrideContext)
        await wait(() => {
          expect(defaultProps.fetchBooks).toHaveBeenCalledTimes(1)
          expect(defaultProps.fetchBooks).toHaveBeenCalledWith(user.id)
        })
      })
    })
  })

  describe('Not Authenticated', () => {
    beforeEach(() => {
      overrideContext = { ...defaultAppContext }
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
        ...defaultAppContext,
        appInitialized: false,
      }
    })

    it('displays a loader while the app is initializing', () => {
      const { container, getByText } = wrappedRender(
        <AppContent {...defaultProps} />,
        overrideContext,
      )
      // ensure the titlebar is still displayed while loading
      expect(getByText(/Bookly/i)).toBeInTheDocument()
      expect(container.querySelector('.loading')).toBeInTheDocument()
    })
  })
})
