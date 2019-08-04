import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render } from 'react-testing-library'

import { CardSpacer, CardSpacerProps, CardSpacerSize } from './CardSpacer'

let defaultProps: CardSpacerProps

describe('CardSpacer', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      size: CardSpacerSize.Medium,
    }
  })

  afterEach(cleanup)

  describe('Conditional Styling', () => {
    it('applies "medium" sizing by default', () => {
      const { container } = render(<CardSpacer {...defaultProps} />)
      expect(container.querySelectorAll('.small')).toHaveLength(0)
      expect(container.querySelectorAll('.medium')).toHaveLength(1)
      expect(container.querySelectorAll('.large')).toHaveLength(0)
    })

    it('correctly applies "small" sizing', () => {
      const { container } = render(
        <CardSpacer {...defaultProps} size={CardSpacerSize.Small} />,
      )
      expect(container.querySelectorAll('.small')).toHaveLength(1)
      expect(container.querySelectorAll('.medium')).toHaveLength(0)
      expect(container.querySelectorAll('.large')).toHaveLength(0)
    })

    it('correctly applies "medium" sizing', () => {
      const { container } = render(
        <CardSpacer {...defaultProps} size={CardSpacerSize.Medium} />,
      )
      expect(container.querySelectorAll('.small')).toHaveLength(0)
      expect(container.querySelectorAll('.medium')).toHaveLength(1)
      expect(container.querySelectorAll('.large')).toHaveLength(0)
    })

    it('correctly applies "large" sizing', () => {
      const { container } = render(
        <CardSpacer {...defaultProps} size={CardSpacerSize.Large} />,
      )
      expect(container.querySelectorAll('.small')).toHaveLength(0)
      expect(container.querySelectorAll('.medium')).toHaveLength(0)
      expect(container.querySelectorAll('.large')).toHaveLength(1)
    })
  })
})
