import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render } from 'react-testing-library'

import Form, { FormProps } from './Form'

let defaultProps: FormProps

describe('Form', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      cancelBtnText: 'Cancel',
      children: [],
      classes: [],
      disabled: false,
      error: '',
      loading: false,
      onCancel: jest.fn(),
      onSubmit: jest.fn(),
      renderLoader: jest.fn(),
      submitBtnText: 'Submit',
      submitDisabled: false,
      title: '',
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<Form {...defaultProps} />)
      const wrapper = container.firstChild
      expect(wrapper).toHaveClass('form')
    })
  })

  describe('Conditional Rendering', () => {
    describe('Form title', () => {
      it('does not render a title when prop is empty', () => {
        const { container } = render(<Form {...defaultProps} />)
        expect(container.querySelector('.title')).toBeNull()
      })

      it('renders a title when prop is provided', () => {
        const title = 'Awesome title'
        const { container, getByText } = render(
          <Form {...defaultProps} title={title} />,
        )
        expect(container.querySelector('.title')).not.toBeNull()
        expect(getByText(title)).toBeInTheDocument()
      })
    })

    describe('Cancel button', () => {
      it('does not render "cancel" button when "onCancel" prop is empty', () => {
        const { container, queryByText } = render(
          <Form {...defaultProps} onCancel={undefined} />,
        )
        expect(container.querySelectorAll('button')).toHaveLength(1)
        expect(queryByText('Cancel')).toBeNull()
      })

      it('renders "cancel" button when "onCancel" prop is present', () => {
        const { container, getByText } = render(<Form {...defaultProps} />)
        expect(container.querySelectorAll('button')).toHaveLength(2)
        expect(getByText('Cancel')).toBeInTheDocument()
      })
    })

    describe('Alert with error message', () => {
      it('does not render an Alert when there is no error', () => {
        const { queryByRole } = render(<Form {...defaultProps} />)
        expect(queryByRole('alert')).toBeNull()
      })

      it('renders an Alert with the error message when it is present', () => {
        const { getByRole } = render(<Form {...defaultProps} error="ONOS" />)
        expect(getByRole('alert')).toBeInTheDocument()
      })
    })

    describe('Disabled state', () => {
      it('Does not disable any fields by default', () => {
        const { container } = render(<Form {...defaultProps} />)
        const disabledButtons = container.querySelectorAll('button[disabled]')
        expect(disabledButtons).toHaveLength(0)
      })

      it('Disables all buttons when "disabled" is true', () => {
        const { container } = render(<Form {...defaultProps} disabled={true} />)
        const allButtons = container.querySelectorAll('button')
        const disabledButtons = container.querySelectorAll('button[disabled]')
        expect(disabledButtons).toHaveLength(allButtons.length)
      })
    })

    describe('Loader rendering', () => {
      it('Does not call the "renderLoader" prop when none is provided, even if "loading" is true', () => {
        const { container } = render(
          <Form {...defaultProps} loading={true} renderLoader={undefined} />,
        )
        expect(defaultProps.renderLoader).toHaveBeenCalledTimes(0)
      })

      it('Calls the "renderLoader" prop when one is provided and "loading" is true', () => {
        const { container } = render(<Form {...defaultProps} loading={true} />)
        expect(defaultProps.renderLoader).toHaveBeenCalledTimes(1)
      })
    })
  })
})
