import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render, fireEvent } from 'react-testing-library'

import Button, { ButtonProps, ButtonType } from './Button'

let defaultProps: ButtonProps

describe('Button', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      block: false,
      children: 'Button',
      disabled: false,
      loading: false,
      onClick: jest.fn(),
      type: ButtonType.Primary,
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { container, getByText } = render(
        <Button {...defaultProps}>hello</Button>,
      )
      expect(container.querySelectorAll('button')).toHaveLength(1)
      expect(getByText(/hello/)).toBeInTheDocument()
      expect(getByText(/hello/)).toHaveClass('button')
      expect(
        container.querySelector('button[disabled]'),
      ).not.toBeInTheDocument()
    })
  })

  describe('Actions', () => {
    it('calls the "onClick" callback when clicked', () => {
      const { getByText } = render(<Button {...defaultProps}>hello</Button>)
      const { onClick } = defaultProps
      expect(onClick).toHaveBeenCalledTimes(0)
      fireEvent.click(getByText(/hello/i))
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Disabled state', () => {
    it('applies "disabled" state and class when the prop is true', () => {
      const { container } = render(
        <Button {...defaultProps} disabled={true}>
          hello
        </Button>,
      )
      expect(container.querySelector('button[disabled]')).toBeInTheDocument()
    })
  })

  describe('Button Type', () => {
    it('applies "primary" type by default', () => {
      const { container } = render(<Button {...defaultProps}>hello</Button>)
      expect(container.firstChild).toHaveClass('button-primary')
    })

    it('applies a specific button type correctly', () => {
      const { container } = render(
        <Button {...defaultProps} type={ButtonType.Danger}>
          hello
        </Button>,
      )
      expect(container.firstChild).toHaveClass('button-danger')
    })
  })

  describe('loader button', () => {
    it('does not apply "loading" state by default', () => {
      const { container } = render(<Button {...defaultProps}>hello</Button>)
      expect(container.querySelectorAll('.button-loader')).toHaveLength(0)
    })

    it('applies "loading" state when prop is true', () => {
      const { container } = render(
        <Button {...defaultProps} loading={true}>
          hello
        </Button>,
      )
      expect(container.querySelectorAll('.button-loader')).toHaveLength(1)
    })
  })

  describe('block button', () => {
    it('does not apply "block" state by default', () => {
      const { container } = render(<Button {...defaultProps}>hello</Button>)
      expect(container.querySelectorAll('.button-block')).toHaveLength(0)
    })

    it('applies "block" state when prop is true', () => {
      const { container } = render(
        <Button {...defaultProps} block={true}>
          hello
        </Button>,
      )
      expect(container.querySelectorAll('.button-block')).toHaveLength(1)
    })
  })

  xdescribe('double-click button', () => {
    it.todo('requires a second click to confirm an action when prop is true')

    it.todo(
      'times out after a specified amount if second click does not happen',
    )
  })
})
