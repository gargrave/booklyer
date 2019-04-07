import * as React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, render } from 'react-testing-library'

import Button from '../Button/Button'

import ButtonRow, { ButtonRowProps } from './ButtonRow'

let defaultProps: ButtonRowProps

const onClick = jest.fn()

describe('ButtonRow', () => {
  beforeEach(() => {
    defaultProps = {
      children: [],
    }
  })

  afterEach(cleanup)

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      const { container, getByText } = render(
        <ButtonRow {...defaultProps}>
          <Button onClick={onClick}>Button 1</Button>
          <Button onClick={onClick}>Button 2</Button>
          <Button onClick={onClick}>Button 3</Button>
        </ButtonRow>,
      )
      const wrapper = container.firstChild
      expect(wrapper).toHaveClass('buttonRow')
      expect(container.querySelectorAll('button').length).toBe(3)
      expect(getByText('Button 1')).toBeInTheDocument()
      expect(getByText('Button 2')).toBeInTheDocument()
      expect(getByText('Button 3')).toBeInTheDocument()
    })
  })
})
