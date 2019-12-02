import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent } from '@testing-library/react'

import { Author } from 'app/authors/authors.types'
import { IAppContext } from 'app/core/AppIndex/App.context'
import { mockAuthors, mockUsers } from 'packages/mocks/src/static'
import { bucketizer } from 'utils/bucketizer'
import { renderWithRedux, wrapInAppContext } from 'utils/testHelpers'

import { AuthorsListPage, AuthorsListPageProps } from './AuthorsListPage'

const wrappedRender = (children, overrideContext = {}) =>
  renderWithRedux(wrapInAppContext(children, overrideContext))

const authorBuckets = bucketizer<Author>(
  mockAuthors,
  () => 0,
  author => author.lastName[0],
)

let defaultProps: AuthorsListPageProps

describe('AuthorsListPage', () => {
  let overrideContext: IAppContext

  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      getAuthorsRequestPending: () => false,
      getBucketedAuthors: () => authorBuckets,
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
      it('renders correctly', () => {
        const { getByText } = wrappedRender(
          <AuthorsListPage {...defaultProps} />,
          overrideContext,
        )
        // renders title and "Add" button
        expect(getByText(/My Authors/i)).toBeInTheDocument()
        expect(getByText(/Add an Author/i)).toBeInTheDocument()
        // renders all provided authors
        mockAuthors.forEach(author => {
          expect(getByText(new RegExp(author.lastName))).toBeInTheDocument()
        })
      })
    })

    describe('Interactivity', () => {
      it('navigates to an Author Detail page when the corresponding card is clicked', () => {
        const { getByText } = wrappedRender(
          <AuthorsListPage {...defaultProps} />,
          overrideContext,
        )
        const author = mockAuthors[0]
        const authorCard = getByText(new RegExp(author.lastName))
        const push = defaultProps.history.push

        expect(authorCard).toBeInTheDocument()
        expect(push).toHaveBeenCalledTimes(0)
        fireEvent.click(authorCard)
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith(`/authors/${author.id}`)
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
        const { container } = wrappedRender(
          <AuthorsListPage {...defaultProps} />,
          overrideContext,
        )
        expect(container.firstChild).toBeNull()
      })

      it('redirects to login page', () => {
        wrappedRender(<AuthorsListPage {...defaultProps} />, overrideContext)
        const { push } = defaultProps.history
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/account/login')
      })
    })
  })
})
