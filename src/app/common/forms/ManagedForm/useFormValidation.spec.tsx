import 'jest-dom/extend-expect'

import { InputType } from 'app/common/forms/forms.types'

import { initialState, validate } from './useFormValidation'
import { FieldConfig } from './ManagedForm'

describe('useFormValidation', () => {
  describe('initialState', () => {
    let fields: FieldConfig[]

    beforeEach(() => {
      fields = [
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
    })

    it('correctly reduces fields config to initial state', () => {
      const state = initialState(fields)
      expect(state).toEqual({
        awesomeField: '',
        superDuperField: '',
      })
    })

    it('correctly applies "initialValue" fields', () => {
      const initialValue = { awesomeField: 'OMGzzz' }
      const state = initialState(fields, initialValue)
      expect(state).toEqual({
        awesomeField: 'OMGzzz',
        superDuperField: '',
      })
    })
  })

  describe('validate', () => {
    let fields: FieldConfig[]

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

    describe('Matching fields', () => {
      beforeEach(() => {
        fields = [
          {
            label: 'Password',
            name: 'password',
            required: true,
            type: InputType.password,
            validations: {
              minLength: 8,
            },
          },
          {
            label: 'Confirm Password',
            name: 'passwordConfirm',
            required: true,
            type: InputType.password,
            validations: {
              minLength: 8,
              mustMatch: 'password',
            },
          },
        ]
      })

      it('returns an error if matching fields do not match', () => {
        const state = {
          password: 'password',
          passwordConfirm: 'it dont match',
        }
        const { errors, isValid } = validate(fields, state)
        expect(errors.password).toBeUndefined()
        expect(errors.passwordConfirm).toBeDefined()
        expect(isValid).toBe(false)
      })

      it('passes validation if matching fields match', () => {
        const state = {
          password: 'myGreatPassword',
          passwordConfirm: 'myGreatPassword',
        }
        const { errors, isValid } = validate(fields, state)
        expect(errors.password).toBeUndefined()
        expect(errors.passwordConfirm).toBeUndefined()
        expect(isValid).toBe(true)
      })
    })
  })
})
