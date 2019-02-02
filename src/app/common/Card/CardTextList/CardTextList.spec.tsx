import * as React from 'react'
import { shallow } from 'enzyme'

import {
  CardTextListProps,
  UnwrappedCardTextList as CardTextList,
} from './CardTextList'

let defaultProps: CardTextListProps

describe('CardTextList', () => {
  beforeEach(() => {
    defaultProps = {
      textList: [
        {
          title: 'title of item #1',
          text: 'text of item #1',
        },
        {
          title: 'title of item #2',
          text: 'text of item #2',
        },
      ],
    }
  })

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<CardTextList {...defaultProps} />)
      expect(wrapper.find('div').length).toBe(defaultProps.textList.length)
    })
  })
})
