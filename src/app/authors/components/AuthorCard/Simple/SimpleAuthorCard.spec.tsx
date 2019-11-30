import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render } from '@testing-library/react'

import { mockAuthors } from 'packages/mocks/src/static'

import SimpleAuthorCard, { SimpleAuthorCardProps } from './SimpleAuthorCard'

const testAuthor = { ...mockAuthors[0] }

let defaultProps: SimpleAuthorCardProps

describe('SimpleAuthorCard', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      author: testAuthor,
      getBookCount: jest.fn(),
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { getBookCount } = defaultProps
      const { container, getByText } = render(
        <SimpleAuthorCard {...defaultProps} />,
      )
      const wrapper = container.firstChild
      const fullName = `${testAuthor.firstName} ${testAuthor.lastName}`

      expect(wrapper).toHaveClass('hoverable') // must have hoverable state
      expect(getByText(fullName)).toBeInTheDocument()
      expect(getBookCount).toHaveBeenCalledTimes(1)
    })
  })

  describe('Book count display', () => {
    it('displays the correct singular string for book count', () => {
      const { getByText } = render(
        <SimpleAuthorCard {...defaultProps} getBookCount={jest.fn(() => 1)} />,
      )
      expect(getByText(/1 Book/i)).toBeInTheDocument()
    })

    it('displays the correct plural string for book count', () => {
      const { getByText } = render(
        <SimpleAuthorCard {...defaultProps} getBookCount={jest.fn(() => 2)} />,
      )
      expect(getByText(/2 Books/i)).toBeInTheDocument()
    })
  })
})
