import * as React from 'react'
import { shallow } from 'enzyme'

import {
  CardSpacerProps,
  UnwrappedCardSpacer as CardSpacer,
  CardSpacerSize,
} from './CardSpacer'

let defaultProps: CardSpacerProps

describe('CardSpacer', () => {
  beforeEach(() => {
    defaultProps = {
      size: CardSpacerSize.Medium,
    }
  })

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<CardSpacer {...defaultProps} />)
      expect(wrapper.find('div').length).toBe(1)
    })
  })

  describe('Conditional Styling', () => {
    it('applies "medium" sizing by default', () => {
      const wrapper = shallow(<CardSpacer {...defaultProps} />)
      expect(wrapper.hasClass('small')).toBe(false)
      expect(wrapper.hasClass('medium')).toBe(true)
      expect(wrapper.hasClass('large')).toBe(false)
    })

    it('correctly applies "small" sizing', () => {
      const wrapper = shallow(
        <CardSpacer {...defaultProps} size={CardSpacerSize.Small} />,
      )
      expect(wrapper.hasClass('small')).toBe(true)
      expect(wrapper.hasClass('medium')).toBe(false)
      expect(wrapper.hasClass('large')).toBe(false)
    })

    it('correctly applies "medium" sizing', () => {
      const wrapper = shallow(
        <CardSpacer {...defaultProps} size={CardSpacerSize.Medium} />,
      )
      expect(wrapper.hasClass('small')).toBe(false)
      expect(wrapper.hasClass('medium')).toBe(true)
      expect(wrapper.hasClass('large')).toBe(false)
    })

    it('correctly applies "large" sizing', () => {
      const wrapper = shallow(
        <CardSpacer {...defaultProps} size={CardSpacerSize.Large} />,
      )
      expect(wrapper.hasClass('small')).toBe(false)
      expect(wrapper.hasClass('medium')).toBe(false)
      expect(wrapper.hasClass('large')).toBe(true)
    })
  })
})
