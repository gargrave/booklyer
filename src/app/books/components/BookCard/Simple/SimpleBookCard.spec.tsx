import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, render } from '@testing-library/react'

import { Book } from 'app/books/books.types'
import { mockBooks } from 'packages/mocks/src/static'

import SimpleBookCard, { SimpleBookCardProps } from './SimpleBookCard'

const testBook = mockBooks[0]

let defaultProps: SimpleBookCardProps

describe('SimpleBookCard', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      book: testBook,
      onClick: jest.fn(),
      showAuthor: false,
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { container, getByText } = render(
        <SimpleBookCard {...defaultProps} />,
      )
      expect(container.querySelector('.hoverable')).toBeInTheDocument()
      expect(getByText(testBook.title)).toBeInTheDocument()
    })
  })

  describe('Conditional Rendering', () => {
    it('does not render the author name by default', () => {
      const { queryByText } = render(<SimpleBookCard {...defaultProps} />)
      const authorName = `${testBook.author.firstName} ${
        testBook.author.lastName
      }`
      expect(queryByText(authorName)).not.toBeInTheDocument()
    })

    it('renders the author name when "showAuthor" is true', () => {
      const { getByText } = render(
        <SimpleBookCard {...defaultProps} showAuthor={true} />,
      )
      const authorName = `${testBook.author.firstName} ${
        testBook.author.lastName
      }`
      expect(getByText(authorName)).toBeInTheDocument()
    })

    it('does not render "sorted by" info when none is present', () => {
      const { queryByText } = render(<SimpleBookCard {...defaultProps} />)
      expect(queryByText(/Sorted by/i)).not.toBeInTheDocument()
    })

    it('renders the "sorted by" info when it is present', () => {
      const book: Book = {
        ...testBook,
        sortBy: 'Custom sort field',
      }
      const { getByText } = render(
        <SimpleBookCard {...defaultProps} book={book} />,
      )
      expect(getByText(/Sorted by: Custom sort field/i)).toBeInTheDocument()
    })
  })

  describe('Interactivity', () => {
    it('calls the callback correctly when clicked', () => {
      const { container } = render(<SimpleBookCard {...defaultProps} />)
      const { onClick } = defaultProps
      expect(onClick).toHaveBeenCalledTimes(0)
      fireEvent.click(container.firstChild as HTMLElement)
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
