import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, fireEvent, render } from 'react-testing-library'

import { mockAuthors } from 'packages/pseudo/src/static/authors'

import DetailedAuthorCard, {
  DetailedAuthorCardProps,
} from './DetailedAuthorCard'

const testAuthor = { ...mockAuthors[0] }

let defaultProps: DetailedAuthorCardProps

describe('DetailedAuthorCard', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      author: testAuthor,
      onBackClick: jest.fn(),
      onEditClick: jest.fn(),
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { getByText } = render(<DetailedAuthorCard {...defaultProps} />)
      const fullName = `${testAuthor.firstName} ${testAuthor.lastName}`
      expect(getByText(fullName)).toBeInTheDocument()
    })
  })

  describe('Interactivity', () => {
    it('calls callbacks when the corresponding buttons are clicked', () => {
      const { getByText } = render(<DetailedAuthorCard {...defaultProps} />)
      const { onBackClick, onEditClick } = defaultProps

      expect(getByText(/Back/i)).toBeInTheDocument()
      expect(getByText(/Edit/i)).toBeInTheDocument()
      expect(onBackClick).toHaveBeenCalledTimes(0)
      fireEvent.click(getByText(/Back/i))
      expect(onBackClick).toHaveBeenCalledTimes(1)
      expect(onEditClick).toHaveBeenCalledTimes(0)
      fireEvent.click(getByText(/Edit/i))
      expect(onEditClick).toHaveBeenCalledTimes(1)
    })
  })
})
