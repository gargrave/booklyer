import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, fireEvent, render } from 'react-testing-library'

import Select, { SelectProps } from './Select'
import { mockAuthors } from 'utils/mocks/static/authors'

const mockGetOptionText = option => `${option.firstName} ${option.lastName}`
const mockGetOptionValue = option => option.id

let defaultProps: SelectProps

describe('Select', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      getOptionText: jest.fn(mockGetOptionText),
      getOptionValue: jest.fn(mockGetOptionValue),
      label: 'test label',
      name: 'test-select',
      onChange: jest.fn(),
      options: [
        { id: 0, firstName: 'Billy', lastName: 'Pickles' },
        { id: 1, firstName: 'Seamus', lastName: 'McGee' },
      ],
      placeholder: 'awesome placeholder text',
      value: mockAuthors[0],
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { container, getByLabelText } = render(<Select {...defaultProps} />)
      const { label, name } = defaultProps
      expect(container.querySelectorAll('select')).toHaveLength(1)
      expect(container.querySelectorAll(`#${name}`)).toHaveLength(1)
      expect(getByLabelText(label!)).toBeInTheDocument()
    })

    it('renders options correctly', () => {
      const { container, getByText } = render(<Select {...defaultProps} />)
      const { getOptionText, getOptionValue, options } = defaultProps

      expect(container.querySelectorAll('option')).toHaveLength(options.length)
      expect(getOptionText).toHaveBeenCalledTimes(options.length)
      expect(getOptionValue).toHaveBeenCalledTimes(options.length)

      // each option gets rendered according to its callbacks
      options.forEach(option => {
        const value = mockGetOptionValue(option)
        expect(getOptionText).toHaveBeenCalledWith(option)
        expect(getOptionValue).toHaveBeenCalledWith(option)
        expect(
          container.querySelectorAll(`option[value="${value}"]`),
        ).toHaveLength(1)
        expect(getByText(mockGetOptionText(option))).toBeInTheDocument()
      })
    })
  })

  describe('Interactivity', () => {
    it('selects the provided value when available', () => {
      const { queryByText } = render(<Select {...defaultProps} />)
      const { placeholder } = defaultProps
      expect(queryByText(placeholder!)).not.toBeInTheDocument()
    })

    it('uses placeholder text when no default value is provided', () => {
      const { getByText } = render(<Select {...defaultProps} value={null} />)
      const { placeholder } = defaultProps
      expect(getByText(placeholder!)).toBeInTheDocument()
    })

    it('calls the "onChange" callback when value is changed', () => {
      const { container } = render(<Select {...defaultProps} />)
      const { onChange, options } = defaultProps
      const select = container.querySelector('select')
      expect(onChange).toHaveBeenCalledTimes(0)
      fireEvent.change(select as HTMLElement, { target: { value: options[0] } })
      expect(onChange).toHaveBeenCalledTimes(1)
    })
  })
})
