import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent } from '@testing-library/react'

import { IAppContext } from 'app/core/AppIndex/App.context'
import { mockUsers } from 'packages/mocks/src/static'
import { renderWithAppContext } from 'utils/testHelpers'

import { ProfilePage, ProfilePageProps } from './ProfilePage'

let defaultProps: ProfilePageProps

describe('ProfilePage', () => {
  let overrideContext: IAppContext

  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      history: { push: jest.fn() } as any,
    }
  })

  afterEach(cleanup)

  describe('Authenticated', () => {
    beforeEach(() => {
      overrideContext = {
        appInitialized: true,
        logout: jest.fn(),
        user: mockUsers[0],
      }
    })

    describe('Basic Rendering', () => {
      it.todo('renders correctly')
    })

    describe('Interactivity', () => {
      it('calls the "logout" callback when clicked', () => {
        const { getByText } = renderWithAppContext(
          <ProfilePage {...defaultProps} />,
          overrideContext,
        )
        const { logout } = overrideContext
        expect(logout).toHaveBeenCalledTimes(0)
        fireEvent.click(getByText(/Logout/i))
        expect(logout).toHaveBeenCalledTimes(1)
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
          <ProfilePage {...defaultProps} />,
          overrideContext,
        )
        expect(container.firstChild).toBeNull()
      })

      it('redirects to login page', () => {
        renderWithAppContext(<ProfilePage {...defaultProps} />, overrideContext)
        const { push } = defaultProps.history
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/account/login')
      })
    })
  })
})
