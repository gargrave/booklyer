import * as React from 'react'
import { shallow } from 'enzyme'

import {
  UnwrappedInputField as InputField,
  InputFieldProps,
  InputType,
} from './InputField'

let defaultProps: InputFieldProps

describe('InputField', () => {
  beforeEach(() => {
    defaultProps = {
      boundValue: '',
      disabled: false,
      error: '',
      label: 'Whatever',
      name: 'text',
      onInputChange: jest.fn(),
      placeholder: '',
      type: InputType.text,
    }
  })

  describe('Label Rendering', () => {
    it('renders the correct label text', () => {
      const wrapper = shallow(<InputField {...defaultProps} />)
      const label = wrapper.find('label')
      expect(label.length).toBe(1)
      expect(label.text()).toMatch(new RegExp(defaultProps.label!))
    })

    it('does not render a label if prop is empty', () => {
      const wrapper = shallow(<InputField {...defaultProps} label="" />)
      expect(wrapper.find('label').length).toBe(0)
    })
  })

  describe('Error Display', () => {
    it('renders the error correctly when one is present', () => {
      const error = 'error!'
      const wrapper = shallow(<InputField {...defaultProps} error={error} />)
      expect(wrapper.find('.error').length).toBe(1)
      expect(wrapper.find({ children: error }).length).toBe(1)
    })

    it('does not render an error if prop is empty', () => {
      const wrapper = shallow(<InputField {...defaultProps} />)
      expect(wrapper.find('.error').length).toBe(0)
    })
  })

  describe('InputField type', () => {
    it('renders a "text" input correctly', () => {
      const wrapper = shallow(<InputField {...defaultProps} />)
      expect(wrapper.find('input[type="email"]').length).toBe(0)
      expect(wrapper.find('input[type="text"]').length).toBe(1)
      expect(wrapper.find('input[type="password"]').length).toBe(0)
    })

    it('renders a "password" input correctly', () => {
      const wrapper = shallow(
        <InputField {...defaultProps} type={InputType.password} />,
      )
      expect(wrapper.find('input[type="email"]').length).toBe(0)
      expect(wrapper.find('input[type="text"]').length).toBe(0)
      expect(wrapper.find('input[type="password"]').length).toBe(1)
    })
  })

  describe('maxLength', () => {
    it('has a default "maxlength" when none is supplied', () => {
      const wrapper = shallow(<InputField {...defaultProps} />)
      const input = wrapper.find('input')
      expect(input.prop('maxLength')).toBe(255)
    })

    it('correctly applies the "maxLength" attirbute', () => {
      const wrapper = shallow(<InputField {...defaultProps} maxLength={50} />)
      const input = wrapper.find('input')
      expect(input.prop('maxLength')).toBe(50)
    })

    it('clamps min "maxLength" with zero value', () => {
      const wrapper = shallow(<InputField {...defaultProps} maxLength={0} />)
      const input = wrapper.find('input')
      expect(input.prop('maxLength')).toBe(1)
    })

    it('clamps min "maxLength" with negative value', () => {
      const wrapper = shallow(<InputField {...defaultProps} maxLength={-10} />)
      const input = wrapper.find('input')
      expect(input.prop('maxLength')).toBe(1)
    })

    it('clamps max "maxLength"', () => {
      const wrapper = shallow(
        <InputField {...defaultProps} maxLength={10000} />,
      )
      const input = wrapper.find('input')
      expect(input.prop('maxLength')).toBe(255)
    })
  })
})
