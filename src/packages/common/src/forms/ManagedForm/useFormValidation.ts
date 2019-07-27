import { useState } from 'react'
import get from 'lodash/get'

import { FieldConfig, ManagedFormState } from './ManagedForm'

export type ValidationFields = {
  minLength?: number
  mustMatch?: string
}

export type FormValidationPayload = {
  errors: ManagedFormState
  isValid: boolean
}

export const validate = (
  fields: FieldConfig[],
  formState: ManagedFormState,
): FormValidationPayload => {
  // TODO: validation that the state has is not identical to its initial value
  const errors: ManagedFormState = {}

  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i]
    const { name } = field
    const value = formState[name]

    // confirm required fields have an acceptable value
    if (field.required) {
      if (value === null || value === undefined || !value.length) {
        errors[name] = 'This field is required.'
        continue
      }
    }

    const validations = get(field, 'validations')
    if (!validations) {
      continue
    }

    // minimum length validation
    const { minLength } = validations
    if (minLength && value.length) {
      if (minLength > value.length) {
        errors[name] = `Must be at least ${minLength} characters`
        continue
      }
    }

    // matching fields validation
    const { mustMatch } = validations
    if (mustMatch) {
      if (value !== formState[mustMatch]) {
        errors[name] = `Must be the same value as the '${mustMatch}' field`
        continue
      }
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export const defaultValueParser = (val: {}) => {
  return get(val, 'id') || ''
}

export const initialState = (
  fields: FieldConfig[],
  initialValue: any = {},
): ManagedFormState =>
  fields.reduce(
    (acc, field) => {
      let value = initialValue[field.name] || ''
      if (typeof value === 'object') {
        value = defaultValueParser(value)
      }

      return {
        ...acc,
        [field.name]: value,
      }
    },
    {} as ManagedFormState,
  )

type UseValidationProps = {
  fields: FieldConfig[]
  onSubmit: (payload: ManagedFormState) => void
  initialValue?: any
}

// TODO: consider using T for generically typing "initialValue"
export const useFormValidation = ({
  fields,
  onSubmit,
  initialValue,
}: UseValidationProps) => {
  const [formState, setFormState] = useState(initialState(fields, initialValue))
  const [validationErrors, setValidationErrors] = useState(initialState(fields))

  const validatedOnSubmit = event => {
    event.preventDefault()
    const { isValid, errors } = validate(fields, formState)
    setValidationErrors(errors)
    if (isValid) {
      onSubmit(formState)
    }
  }

  return { formState, setFormState, validatedOnSubmit, validationErrors }
}
