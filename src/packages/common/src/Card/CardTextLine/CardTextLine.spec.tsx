import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render } from '@testing-library/react'

import {
  CardTextLine,
  CardTextLineProps,
  CardTextLineType,
} from './CardTextLine'

let defaultProps: CardTextLineProps

describe('CardTextLine', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      text: 'this is the text',
      type: CardTextLineType.Text,
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { container, getAllByText } = render(
        <CardTextLine {...defaultProps} />,
      )
      expect(container.querySelectorAll('.cardTextLine')).toHaveLength(1)
      expect(getAllByText(defaultProps.text)).toHaveLength(1)
    })
  })

  describe('Conditional Styling', () => {
    it('correctly applies the "text" class', () => {
      const { container } = render(<CardTextLine {...defaultProps} />)
      expect(container.querySelectorAll('.text')).toHaveLength(1)
      expect(container.querySelectorAll('.subtext')).toHaveLength(0)
      expect(container.querySelectorAll('.title')).toHaveLength(0)
    })

    it('correctly applies the "subtext" class', () => {
      const { container } = render(
        <CardTextLine {...defaultProps} type={CardTextLineType.Subtext} />,
      )
      expect(container.querySelectorAll('.text')).toHaveLength(0)
      expect(container.querySelectorAll('.subtext')).toHaveLength(1)
      expect(container.querySelectorAll('.title')).toHaveLength(0)
    })

    it('correctly applies the "title" class', () => {
      const { container } = render(
        <CardTextLine {...defaultProps} type={CardTextLineType.Title} />,
      )
      expect(container.querySelectorAll('.text')).toHaveLength(0)
      expect(container.querySelectorAll('.subtext')).toHaveLength(0)
      expect(container.querySelectorAll('.title')).toHaveLength(1)
    })
  })
})
