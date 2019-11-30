import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render } from '@testing-library/react'

import { mockAuthors } from 'packages/mocks/src/static'

import { SimpleAuthorCard, SimpleAuthorCardProps } from './SimpleAuthorCard'

const author = { ...mockAuthors[0] }

let defaultProps: SimpleAuthorCardProps

describe('SimpleAuthorCard', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      author,
      bookCount: 42,
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { container, getByText } = render(
        <SimpleAuthorCard {...defaultProps} />,
      )
      const wrapper = container.firstChild
      const fullName = `${author.firstName} ${author.lastName}`

      expect(wrapper).toHaveClass('hoverable') // must have hoverable state
      expect(getByText(fullName)).toBeInTheDocument()
    })
  })

  describe('Book count display', () => {
    it('displays the correct singular string for book count', () => {
      const { getByText } = render(
        <SimpleAuthorCard {...defaultProps} bookCount={1} />,
      )
      expect(getByText(/1 Book/i)).toBeInTheDocument()
    })

    it('displays the correct plural string for book count', () => {
      const { getByText } = render(
        <SimpleAuthorCard {...defaultProps} bookCount={2} />,
      )
      expect(getByText(/2 Books/i)).toBeInTheDocument()
    })
  })
})
