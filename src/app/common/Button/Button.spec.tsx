import * as React from 'react'
import { shallow } from 'enzyme'

import { ButtonProps, ButtonType, UnwrappedButton as Button } from './Button'

const defaultProps: ButtonProps = {
  block: false,
  children: 'Button',
  disabled: false,
  loading: false,
  type: ButtonType.Primary,
}

describe('Button', () => {
  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<Button {...defaultProps}>hello</Button>)
      expect(wrapper.find('button').length).toBe(1)
      expect(wrapper.hasClass('button')).toBe(true)
      expect(wrapper.find({ children: 'hello' }).length).toBe(1)
    })
  })

  describe('Disabled state', () => {
    it('applies "disabled" state and class when the prop is true', () => {
      const wrapper = shallow(
        <Button {...defaultProps} disabled={true}>
          hello
        </Button>,
      )
      expect(wrapper.prop('disabled')).toBe(true)
    })

    it('does not apply "disabled" state or class when the prop is false', () => {
      const wrapper = shallow(<Button {...defaultProps}>hello</Button>)
      expect(wrapper.prop('disabled')).toBe(false)
    })
  })

  describe('Button Type', () => {
    it('applies "primary" type by default', () => {
      const wrapper = shallow(<Button {...defaultProps}>abcd</Button>)
      expect(wrapper.hasClass('button-primary')).toBe(true)
    })

    it('applies "danger" type correctly', () => {
      const wrapper = shallow(
        <Button {...defaultProps} type={ButtonType.Danger}>
          danger
        </Button>,
      )
      expect(wrapper.hasClass('button-danger')).toBe(true)
    })

    it('applies "dark" type correctly', () => {
      const wrapper = shallow(
        <Button {...defaultProps} type={ButtonType.Dark}>
          dark
        </Button>,
      )
      expect(wrapper.hasClass('button-dark')).toBe(true)
    })

    it('applies "info" type correctly', () => {
      const wrapper = shallow(
        <Button {...defaultProps} type={ButtonType.Info}>
          info
        </Button>,
      )
      expect(wrapper.hasClass('button-info')).toBe(true)
    })

    it('applies "light" type correctly', () => {
      const wrapper = shallow(
        <Button {...defaultProps} type={ButtonType.Light}>
          light
        </Button>,
      )
      expect(wrapper.hasClass('button-light')).toBe(true)
    })

    it('applies "link" type correctly', () => {
      const wrapper = shallow(
        <Button {...defaultProps} type={ButtonType.Link}>
          link
        </Button>,
      )
      expect(wrapper.hasClass('button-link')).toBe(true)
    })

    it('applies "secondary" type correctly', () => {
      const wrapper = shallow(
        <Button {...defaultProps} type={ButtonType.Secondary}>
          secondary
        </Button>,
      )
      expect(wrapper.hasClass('button-secondary')).toBe(true)
    })

    it('applies "success" type correctly', () => {
      const wrapper = shallow(
        <Button {...defaultProps} type={ButtonType.Success}>
          success
        </Button>,
      )
      expect(wrapper.hasClass('button-success')).toBe(true)
    })

    it('applies "warning" type correctly', () => {
      const wrapper = shallow(
        <Button {...defaultProps} type={ButtonType.Warning}>
          warning
        </Button>,
      )
      expect(wrapper.hasClass('button-warning')).toBe(true)
    })
  })

  describe('loader button', () => {
    it('does not apply "loading" state by default', () => {
      const wrapper = shallow(<Button {...defaultProps}>no loader</Button>)
      expect(wrapper.hasClass('button-loader')).toBe(false)
    })

    it('applies "loading" state when prop is true', () => {
      const wrapper = shallow(
        <Button {...defaultProps} loading={true}>
          loader
        </Button>,
      )
      expect(wrapper.hasClass('button-loader')).toBe(true)
    })
  })

  describe('block button', () => {
    it('does not apply "block" state by default', () => {
      const wrapper = shallow(<Button {...defaultProps}>no block</Button>)
      expect(wrapper.hasClass('button-block')).toBe(false)
    })

    it('applies "block" state when prop is true', () => {
      const wrapper = shallow(
        <Button {...defaultProps} block={true}>
          no block
        </Button>,
      )
      expect(wrapper.hasClass('button-block')).toBe(true)
    })
  })
})
