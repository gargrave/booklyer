import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render } from 'react-testing-library'

import Alert, { AlertProps, AlertType } from './Alert'

let defaultProps: AlertProps

describe('Alert', () => {
  beforeEach(() => {
    defaultProps = {
      children: [],
      message: 'This is an Alert',
      type: AlertType.primary,
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { container, getByRole, getByText } = render(
        <Alert {...defaultProps} />,
      )
      const wrapper = container.firstChild

      expect(wrapper).toHaveClass('alert')
      expect(wrapper).toHaveClass('alertContainer')
      expect(getByRole('alert')).toBeInTheDocument()
      expect(getByText(defaultProps.message)).toBeInTheDocument()
    })
  })

  describe('Additional "children" rendering', () => {
    it('renders additional children in addition to the message', () => {
      const text = 'This is an additional child'
      const { getByText } = render(
        <Alert {...defaultProps}>
          <p>{text}</p>
        </Alert>,
      )
      expect(getByText(text)).toBeInTheDocument()
    })
  })

  describe('Setting "types" classes', () => {
    it('defaults to "primary" type', () => {
      const propsWithoutType = { ...defaultProps }
      delete propsWithoutType.type
      const { container } = render(<Alert {...propsWithoutType} />)
      expect(container.firstChild).toHaveClass('alert-primary')
    })

    it('correctly sets the "danger" type', () => {
      const { container } = render(
        <Alert {...defaultProps} type={AlertType.danger} />,
      )
      expect(container.firstChild).toHaveClass('alert-danger')
    })

    it('correctly sets the "dark" type', () => {
      const { container } = render(
        <Alert {...defaultProps} type={AlertType.dark} />,
      )
      expect(container.firstChild).toHaveClass('alert-dark')
    })

    it('correctly sets the "info" type', () => {
      const { container } = render(
        <Alert {...defaultProps} type={AlertType.info} />,
      )
      expect(container.firstChild).toHaveClass('alert-info')
    })

    it('correctly sets the "light" type', () => {
      const { container } = render(
        <Alert {...defaultProps} type={AlertType.light} />,
      )
      expect(container.firstChild).toHaveClass('alert-light')
    })

    it('correctly sets the "primary" type', () => {
      const { container } = render(
        <Alert {...defaultProps} type={AlertType.primary} />,
      )
      expect(container.firstChild).toHaveClass('alert-primary')
    })

    it('correctly sets the "secondary" type', () => {
      const { container } = render(
        <Alert {...defaultProps} type={AlertType.secondary} />,
      )
      expect(container.firstChild).toHaveClass('alert-secondary')
    })

    it('correctly sets the "success" type', () => {
      const { container } = render(
        <Alert {...defaultProps} type={AlertType.success} />,
      )
      expect(container.firstChild).toHaveClass('alert-success')
    })

    it('correctly sets the "warning" type', () => {
      const { container } = render(
        <Alert {...defaultProps} type={AlertType.warning} />,
      )
      expect(container.firstChild).toHaveClass('alert-warning')
    })
  })
})
