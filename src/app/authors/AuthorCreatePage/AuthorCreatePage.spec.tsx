import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, fireEvent, render, wait } from 'react-testing-library'

import { mockUsers } from 'utils/mocks/static/users'

import AuthorCreatePage, { AuthorCreatePageProps } from './AuthorCreatePage'

// mock "userRequiredAuthentication" with mock getUser implementation
const mockGetUser = jest.fn()
jest.mock('app/auth/utils/useRequiredAuthentication', () => {
  return {
    useRequiredAuthentication: () => ({
      getUser: mockGetUser,
    }),
  }
})

let defaultProps: AuthorCreatePageProps

describe('AuthorCreatePage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      createAuthor: jest.fn(),
      fetchAuthors: jest.fn(),
      getAuthors: jest.fn(),
      getAuthorsRequestPending: jest.fn(),
      history: {
        push: jest.fn(),
      },
    }
  })

  afterEach(cleanup)

  describe('Authenticated', () => {
    let user = mockUsers[0]

    beforeEach(() => {
      mockGetUser.mockImplementation(() => user)
    })

    describe('Basic Rendering', () => {
      it('renders correctly', () => {
        const { container } = render(<AuthorCreatePage {...defaultProps} />)
        expect(container.firstChild).not.toBeNull()
      })
    })

    describe('Interactivity', () => {
      it('handles form "cancel" action', () => {
        const { getByText } = render(<AuthorCreatePage {...defaultProps} />)

        // should redirect back to "authors list" page when cancelled
        expect(defaultProps.history.push).toHaveBeenCalledTimes(0)
        fireEvent.click(getByText(/Cancel/i))
        expect(defaultProps.createAuthor).toHaveBeenCalledTimes(0)
        expect(defaultProps.history.push).toHaveBeenCalledTimes(1)
        expect(defaultProps.history.push).toHaveBeenCalledWith('/authors')
      })

      it('handles form "confirm" action correctly', async () => {
        const { getByLabelText, getByText } = render(
          <AuthorCreatePage {...defaultProps} />,
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
        // should redirect back to "authors list" page when cancelled
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
      mockGetUser.mockImplementation(() => null)
    })

    describe('Basic Rendering', () => {
      it('renders nothing when not logged in', () => {
        const { container } = render(<AuthorCreatePage {...defaultProps} />)
        expect(container.firstChild).toBeNull()
      })
    })
  })
})
