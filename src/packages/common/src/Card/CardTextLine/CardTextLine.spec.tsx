import * as React from 'react'
import { shallow } from 'enzyme'

import {
  CardTextLineProps,
  UnwrappedCardTextLine as CardTextLine,
  CardTextLineType,
} from './CardTextLine'

let defaultProps: CardTextLineProps

describe('CardTextLine', () => {
  beforeEach(() => {
    defaultProps = {
      text: 'this is the text',
      type: CardTextLineType.Text,
    }
  })

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<CardTextLine {...defaultProps} />)
      expect(wrapper.find('div').length).toBe(1)
      expect(wrapper.find({ children: defaultProps.text }).length).toBe(1)
    })
  })

  describe('Conditional Styling', () => {
    it('correctly applies the "text" class', () => {
      const wrapper = shallow(<CardTextLine {...defaultProps} />)
      expect(wrapper.hasClass('text')).toBe(true)
      expect(wrapper.hasClass('subtext')).toBe(false)
      expect(wrapper.hasClass('title')).toBe(false)
    })

    it('correctly applies the "subtext" class', () => {
      const wrapper = shallow(
        <CardTextLine {...defaultProps} type={CardTextLineType.Subtext} />,
      )
      expect(wrapper.hasClass('text')).toBe(false)
      expect(wrapper.hasClass('subtext')).toBe(true)
      expect(wrapper.hasClass('title')).toBe(false)
    })

    it('correctly applies the "title" class', () => {
      const wrapper = shallow(
        <CardTextLine {...defaultProps} type={CardTextLineType.Title} />,
      )
      expect(wrapper.hasClass('text')).toBe(false)
      expect(wrapper.hasClass('subtext')).toBe(false)
      expect(wrapper.hasClass('title')).toBe(true)
    })
  })
})
