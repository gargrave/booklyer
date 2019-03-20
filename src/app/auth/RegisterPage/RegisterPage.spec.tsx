import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render } from 'react-testing-library'

import RegisterPage, { RegisterPageProps } from './RegisterPage'

let defaultProps: RegisterPageProps

describe('RegisterPage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    defaultProps = {
      getAuthRequestPending: jest.fn(),
      history: {
        push: jest.fn(),
      },
      login: jest.fn(),
      register: jest.fn(),
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<RegisterPage {...defaultProps} />)
      expect(container.querySelectorAll('form')).toHaveLength(1)
    })
  })
})
