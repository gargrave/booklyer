import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render } from 'react-testing-library'

import { formFields } from 'utils/mocks/static/formFields'

import ManagedForm, { ManagedFormProps } from './ManagedForm'

let defaultProps: ManagedFormProps

describe('ManagedForm', () => {
  beforeEach(() => {
    defaultProps = {
      children: [],
      fields: formFields,
      onSubmit: jest.fn(),
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<ManagedForm {...defaultProps} />)
      expect(container.querySelectorAll('form')).toHaveLength(1)
      expect(container.querySelectorAll('input')).toHaveLength(
        formFields.length,
      )
    })
  })
})
