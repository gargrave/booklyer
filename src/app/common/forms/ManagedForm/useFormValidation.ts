import { useState } from 'react'
import get from 'lodash/get'

import { FieldConfig, ManagedFormState } from './ManagedForm'

export type FormValidationPayload = {
  errors: ManagedFormState
  isValid: boolean
}

export const validate = (
  fields: FieldConfig[],
  formState: ManagedFormState,
): FormValidationPayload => {
  const errors = {} as ManagedFormState

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

    const { minLength } = validations
    if (minLength && value.length) {
      if (minLength > value.length) {
        errors[name] = `Must be at least ${minLength} characters`
        continue
      }
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export const initialState = (fields: FieldConfig[]): ManagedFormState =>
  fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: '',
    }),
    {} as ManagedFormState,
  )

type UseValidationProps = {
  fields: FieldConfig[]
  onSubmit: (payload: ManagedFormState) => void
}

export const useFormValidation = ({ fields, onSubmit }: UseValidationProps) => {
  const [formState, setFormState] = useState(initialState(fields))
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
