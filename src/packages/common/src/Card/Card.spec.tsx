import * as React from 'react'
import { shallow } from 'enzyme'

import Card, { CardProps } from './Card'

let defaultProps: CardProps

describe('Card', () => {
  beforeEach(() => {
    defaultProps = {
      hoverable: false,
      onClick: jest.fn(),
    }
  })

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const wrapper = shallow(
        <Card {...defaultProps}>
          <p>Child</p>
        </Card>,
      )
      expect(wrapper.find('div').length).toBe(1)
      expect(wrapper.find('p').length).toBe(1)
    })
  })

  describe('Conditional styling', () => {
    it('does not apply the "hoverable" class by default', () => {
      const wrapper = shallow(<Card {...defaultProps} />)
      expect(wrapper.hasClass('hoverable')).toBe(false)
    })

    it('appliesthe "hoverable" class when "hoverable" prop is true', () => {
      const wrapper = shallow(<Card {...defaultProps} hoverable={true} />)
      expect(wrapper.hasClass('hoverable')).toBe(true)
    })
  })

  describe('Interactivity', () => {
    it('calls the "onClick" callback when clicked', () => {
      const wrapper = shallow(<Card {...defaultProps} />)
      expect(defaultProps.onClick).toHaveBeenCalledTimes(0)
      wrapper.simulate('click')
      expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
    })
  })
})
