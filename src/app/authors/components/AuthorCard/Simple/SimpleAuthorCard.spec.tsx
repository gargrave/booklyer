import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render } from 'react-testing-library'

import { mockAuthors } from 'packages/pseudo/src/static/authors'

import SimpleAuthorCard, { SimpleAuthorCardProps } from './SimpleAuthorCard'

const testAuthor = { ...mockAuthors[0] }

let defaultProps: SimpleAuthorCardProps

describe('SimpleAuthorCard', () => {
  beforeEach(() => {
    defaultProps = {
      author: testAuthor,
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { container, getByText } = render(
        <SimpleAuthorCard {...defaultProps} />,
      )
      const wrapper = container.firstChild
      const fullName = `${testAuthor.firstName} ${testAuthor.lastName}`

      expect(wrapper).toHaveClass('hoverable') // must have overable state
      expect(getByText(fullName)).toBeInTheDocument()
    })
  })
})
