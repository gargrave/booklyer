import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, fireEvent, render } from 'react-testing-library'

import { AppContext, IAppContext } from 'app/core/AppIndex/App.context'
import { bucketizer } from 'utils/bucketizer'
import { mockAuthors, mockUsers } from 'utils/mocks/static'
import { Author } from '../authors.types'

import AuthorsListPage, { AuthorsListPageProps } from './AuthorsListPage'

const defaultContext = {
  appInitialized: false,
  user: undefined,
}

const renderWithContext = (children, overrideContext = {}) =>
  render(
    <AppContext.Provider value={{ ...defaultContext, ...overrideContext }}>
      {children}
    </AppContext.Provider>,
  )

const mockGetBucketedAuthors = () =>
  bucketizer<Author>(mockAuthors, () => 0, author => author.lastName[0])

let defaultProps: AuthorsListPageProps

describe('AuthorsListPage', () => {
  let overrideContext: IAppContext

  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      getAuthorsRequestPending: jest.fn(),
      getBucketedAuthors: jest.fn(mockGetBucketedAuthors),
      history: { push: jest.fn() } as any,
    }
  })

  afterEach(cleanup)

  describe('Authenticated', () => {
    beforeEach(() => {
      overrideContext = { appInitialized: true, user: mockUsers[0] }
    })

    describe('Basic Rendering', () => {
      it('renders correctly', () => {
        const { getByText } = renderWithContext(
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
        const { getByText } = renderWithContext(
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
      overrideContext = { appInitialized: true, user: undefined }
    })

    describe('Basic Rendering', () => {
      it('renders nothing when not logged in', () => {
        const { container } = renderWithContext(
          <AuthorsListPage {...defaultProps} />,
          overrideContext,
        )
        expect(container.firstChild).toBeNull()
      })

      it('redirects to login page', () => {
        renderWithContext(
          <AuthorsListPage {...defaultProps} />,
          overrideContext,
        )
        const { push } = defaultProps.history
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/account/login')
      })
    })
  })
})
