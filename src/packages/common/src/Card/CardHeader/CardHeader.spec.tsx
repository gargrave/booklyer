import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render } from '@testing-library/react'

import { CardHeader, CardHeaderProps } from './CardHeader'

let defaultProps: CardHeaderProps

describe('CardHeader', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      text: 'this is the text',
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { container, getAllByText } = render(
        <CardHeader {...defaultProps} />,
      )

      expect(container.querySelectorAll('.cardHeader')).toHaveLength(1)
      expect(getAllByText(/this is the text/i)).toHaveLength(1)
    })
  })
})
