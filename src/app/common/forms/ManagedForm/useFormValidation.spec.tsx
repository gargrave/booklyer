import 'jest-dom/extend-expect'

import { InputType } from 'app/common/forms/forms.types'

import { initialState, validate } from './useFormValidation'

describe('useFormValidation', () => {
  describe('initialState', () => {
    it('correctly reduces fields config to initial state', () => {
      const fields = [
        {
          label: 'AWESOME Field',
          name: 'awesomeField',
          type: InputType.text,
        },
        {
          label: 'Super Duper Field',
          name: 'superDuperField',
          type: InputType.password,
        },
      ]
      const state = initialState(fields)
      expect(state).toEqual({
        awesomeField: '',
        superDuperField: '',
      })
    })
  })

  describe('validate', () => {
    let fields

    beforeEach(() => {
      fields = [
        {
          label: 'Username',
          name: 'username',
          required: true,
          type: InputType.text,
          validations: {
            minLength: 8,
          },
        },
        {
          label: 'Password',
          name: 'password',
          required: true,
          type: InputType.password,
          validations: {
            minLength: 8,
          },
        },
      ]
    })

    describe('Required fields', () => {
      it('returns an error if a required field is missing', () => {
        const state = {
          username: '',
          password: 'password',
        }
        const { errors, isValid } = validate(fields, state)
        expect(errors.username).toBeDefined()
        expect(errors.password).not.toBeDefined()
        expect(isValid).toBe(false)
      })

      it('returns an error if a field does not meet "minLength" requirement', () => {
        const state = {
          username: 'abcdefg',
          password: 'password',
        }
        const { errors, isValid } = validate(fields, state)
        expect(errors.username).toBeDefined()
        expect(errors.password).not.toBeDefined()
        expect(isValid).toBe(false)
      })

      it('returns multiple errors for all invalid fields', () => {
        const state = {
          username: 'abcdefg',
          password: 'passwrd',
        }
        const { errors, isValid } = validate(fields, state)
        expect(errors.username).toBeDefined()
        expect(errors.password).toBeDefined()
        expect(isValid).toBe(false)
      })

      it('passes validation if all fields are a-okay', () => {
        const state = {
          username: 'username',
          password: 'password',
        }
        const { errors, isValid } = validate(fields, state)
        expect(errors.username).not.toBeDefined()
        expect(errors.password).not.toBeDefined()
        expect(isValid).toBe(true)
      })
    })
  })
})
