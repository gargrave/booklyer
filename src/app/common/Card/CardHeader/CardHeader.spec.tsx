import * as React from 'react'
import { shallow } from 'enzyme'

import {
  CardHeaderProps,
  UnwrappedCardHeader as CardHeader,
} from './CardHeader'

let defaultProps: CardHeaderProps

describe('CardHeader', () => {
  beforeEach(() => {
    defaultProps = {
      text: 'this is the text',
    }
  })

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<CardHeader {...defaultProps} />)
      expect(wrapper.find('div').length).toBe(1)
      expect(wrapper.find({ children: defaultProps.text }).length).toBe(1)
    })
  })
})
