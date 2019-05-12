import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, fireEvent, render } from 'react-testing-library'

import Card, { CardProps } from './Card'

let defaultProps: CardProps

describe('Card', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      hoverable: false,
      onClick: jest.fn(),
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { container, getAllByText } = render(
        <Card {...defaultProps}>
          <p>Card!</p>
        </Card>,
      )
      expect(container.querySelectorAll('.card')).toHaveLength(1)
      expect(container.querySelectorAll('p')).toHaveLength(1)
      expect(getAllByText(/^Card!$/i)).toHaveLength(1)
    })
  })

  describe('Conditional styling', () => {
    it('does not apply the "hoverable" class by default', () => {
      const { container } = render(<Card {...defaultProps} />)
      expect(container.querySelectorAll('.hoverable')).toHaveLength(0)
    })

    it('appliesthe "hoverable" class when "hoverable" prop is true', () => {
      const { container } = render(<Card {...defaultProps} hoverable={true} />)
      expect(container.querySelectorAll('.hoverable')).toHaveLength(1)
    })
  })

  describe('Interactivity', () => {
    it('calls the "onClick" callback when clicked', () => {
      const { container } = render(<Card {...defaultProps} />)
      const { onClick } = defaultProps
      expect(onClick).toHaveBeenCalledTimes(0)
      fireEvent.click(container.firstChild as HTMLElement)
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
