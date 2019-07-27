import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render } from 'react-testing-library'

import { InputType } from '../Input.types'
import { InputField, InputFieldProps } from './InputField'

let defaultProps: InputFieldProps

describe('InputField', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      disabled: false,
      error: '',
      label: 'Whatever',
      name: 'text',
      onChange: jest.fn(),
      placeholder: '',
      type: InputType.text,
      value: '',
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders the correct label text', () => {
      const { container, getByText } = render(<InputField {...defaultProps} />)
      expect(container.querySelector('label')).toBeInTheDocument()
      expect(getByText(/Whatever/i)).toBeInTheDocument()
    })

    it('does not render a label if prop is empty', () => {
      const { container, queryByText } = render(
        <InputField {...defaultProps} label={undefined} />,
      )
      expect(container.querySelector('label')).not.toBeInTheDocument()
      expect(queryByText(/Whatever/i)).not.toBeInTheDocument()
    })
  })

  describe('Error Display', () => {
    it('renders the error correctly when one is present', () => {
      const error = 'error!'
      const { container, getAllByText } = render(
        <InputField {...defaultProps} error={error} />,
      )
      expect(container.querySelectorAll('.error')).toHaveLength(1)
      expect(getAllByText(error)).toHaveLength(1)
    })

    it('does not render an error if prop is empty', () => {
      const { container } = render(<InputField {...defaultProps} />)
      expect(container.querySelectorAll('.error')).toHaveLength(0)
    })
  })

  describe('InputField type', () => {
    it('renders a "text" input correctly', () => {
      const { container } = render(<InputField {...defaultProps} />)
      expect(container.querySelectorAll('input[type="email"]')).toHaveLength(0)
      expect(container.querySelectorAll('input[type="text"]')).toHaveLength(1)
      expect(container.querySelectorAll('input[type="password"]')).toHaveLength(
        0,
      )
    })

    it('renders a "password" input correctly', () => {
      const { container } = render(
        <InputField {...defaultProps} type={InputType.password} />,
      )
      expect(container.querySelectorAll('input[type="email"]')).toHaveLength(0)
      expect(container.querySelectorAll('input[type="text"]')).toHaveLength(0)
      expect(container.querySelectorAll('input[type="password"]')).toHaveLength(
        1,
      )
    })
  })

  describe('maxLength', () => {
    it('has a default "maxlength" when none is supplied', () => {
      const { container } = render(<InputField {...defaultProps} />)
      expect(container.querySelectorAll('input[maxlength="255"]')).toHaveLength(
        1,
      )
    })

    it('correctly applies the "maxLength" attirbute', () => {
      const { container } = render(
        <InputField {...defaultProps} maxLength={50} />,
      )
      expect(container.querySelectorAll('input[maxlength="50"]')).toHaveLength(
        1,
      )
    })

    it('clamps min "maxLength" with zero value', () => {
      const { container } = render(
        <InputField {...defaultProps} maxLength={0} />,
      )
      expect(container.querySelectorAll('input[maxlength="1"]')).toHaveLength(1)
    })

    it('clamps min "maxLength" with negative value', () => {
      const { container } = render(
        <InputField {...defaultProps} maxLength={-10} />,
      )
      expect(container.querySelectorAll('input[maxlength="1"]')).toHaveLength(1)
    })

    it('clamps max "maxLength"', () => {
      const { container } = render(
        <InputField {...defaultProps} maxLength={10000} />,
      )
      expect(container.querySelectorAll('input[maxlength="255"]')).toHaveLength(
        1,
      )
    })
  })
})
