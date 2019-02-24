import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render } from 'react-testing-library'

import { mockAuthors } from 'utils/mocks/static/authors'

import AuthorCard, { AuthorCardProps } from './AuthorCard'

const testAuthor = { ...mockAuthors[0] }

let defaultProps: AuthorCardProps

describe('AuthorCard', () => {
  beforeEach(() => {
    defaultProps = {
      author: testAuthor,
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { container, getByText } = render(<AuthorCard {...defaultProps} />)
      const wrapper = container.firstChild
      const fullName = `${testAuthor.firstName} ${testAuthor.lastName}`

      expect(wrapper).toHaveClass('hoverable') // must have overable state
      expect(getByText(fullName)).toBeInTheDocument()
    })
  })
})
