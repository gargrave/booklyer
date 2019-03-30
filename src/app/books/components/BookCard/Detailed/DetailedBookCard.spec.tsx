import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, fireEvent, render } from 'react-testing-library'

import { Book } from 'app/books/books.types'
import { mockBooks } from 'utils/mocks/static/books'

import DetailedBookCard, { DetailedBookCardProps } from './DetailedBookCard'

const testBook = { ...mockBooks[0] }

let defaultProps: DetailedBookCardProps

describe('DetailedBookCard', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      book: testBook,
      onBackClick: jest.fn(),
      onEditClick: jest.fn(),
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { container, getByText } = render(
        <DetailedBookCard {...defaultProps} />,
      )
      expect(container.querySelector('.hoverable')).not.toBeInTheDocument()
      expect(getByText(testBook.title)).toBeInTheDocument()
    })
  })

  describe('Conditional Rendering', () => {
    it('does not render "sorted by" info when none is present', () => {
      const { queryByText } = render(<DetailedBookCard {...defaultProps} />)
      expect(queryByText(/Sorted by/i)).not.toBeInTheDocument()
    })

    it('renders the "sorted by" info when it is present', () => {
      const book: Book = {
        ...testBook,
        sortBy: 'Custom sort field',
      }
      const { getByText } = render(
        <DetailedBookCard {...defaultProps} book={book} />,
      )
      expect(getByText(/Sorted by: Custom sort field/i)).toBeInTheDocument()
    })
  })

  describe('Interactivity', () => {
    it('calls callbacks when the corresponding buttons are clicked', () => {
      const { getByText } = render(<DetailedBookCard {...defaultProps} />)
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
