import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render, fireEvent } from '@testing-library/react'

import AuthorForm, { AuthorFormProps } from './AuthorForm'

let defaultProps: AuthorFormProps

describe('AuthorForm', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      error: '',
      onCancel: jest.fn(),
      onSubmit: jest.fn(),
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { getByLabelText, getByText } = render(
        <AuthorForm {...defaultProps} />,
      )

      // has all expected input fields
      expect(getByLabelText(/First Name/i)).toBeInTheDocument()
      expect(getByLabelText(/Last Name/i)).toBeInTheDocument()
      expect(getByText(/Cancel/i)).toBeInTheDocument()
    })
  })

  describe('Interactivity', () => {
    it('calls the "onCancel" callback when button is clicked', () => {
      const { getByText } = render(<AuthorForm {...defaultProps} />)

      expect(defaultProps.onCancel).toHaveBeenCalledTimes(0)
      fireEvent.click(getByText(/Cancel/i))
      expect(defaultProps.onCancel).toHaveBeenCalledTimes(1)
    })
  })
})
