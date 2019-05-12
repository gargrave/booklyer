import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render } from 'react-testing-library'

import CardTextList, { CardTextListProps } from './CardTextList'

let defaultProps: CardTextListProps

describe('CardTextList', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      textList: [
        {
          text: 'text of item #1',
          title: 'title of item #1',
        },
        {
          text: 'text of item #2',
          title: 'title of item #2',
        },
      ],
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<CardTextList {...defaultProps} />)
      const len = defaultProps.textList.length
      expect(container.querySelectorAll('.item')).toHaveLength(len)
    })
  })
})
