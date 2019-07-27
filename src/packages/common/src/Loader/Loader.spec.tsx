import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render } from 'react-testing-library'

import { Loader, LoaderProps } from './Loader'

let defaultProps: LoaderProps

describe('Loader', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      size: 16,
      transparent: false,
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<Loader {...defaultProps} />)
      const wrapper = container.firstChild
      expect(wrapper).toHaveClass('loaderWrapper')
    })
  })

  describe('Conditional styling', () => {
    it('does not apply "transparent" class by default', () => {
      const { container } = render(<Loader {...defaultProps} />)
      expect(container.querySelectorAll('.transparent')).toHaveLength(0)
    })

    it('applies "transparent" class when prop is true', () => {
      const { container } = render(
        <Loader {...defaultProps} transparent={true} />,
      )
      expect(container.querySelectorAll('.transparent')).toHaveLength(1)
    })

    it('applies an additional class to backdrop when provided', () => {
      const { container } = render(
        <Loader {...defaultProps} backdropClassName="awesomeBackdropClass" />,
      )
      expect(container.querySelectorAll('.awesomeBackdropClass')).toHaveLength(
        1,
      )
    })
  })
})
