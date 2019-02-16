import * as React from 'react'
import { produce } from 'immer'

import Form, { FormProps } from '../Form/Form'
import InputField, { InputFieldType } from '../InputField/InputField'

const initialState = (fields: FieldConfig[]): ManagedFormState =>
  fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: '',
    }),
    {} as ManagedFormState,
  )

const validate = (
  fields: FieldConfig[],
  formState: ManagedFormState,
): FormValidationPayload => {
  const validationErrors = {} as ManagedFormState

  fields.forEach(field => {
    const { name } = field
    const value = formState[name]

    // confirm required fields have an acceptable value
    if (field.required) {
      if (value === null || value === undefined || !value.length) {
        validationErrors[name] = 'This field is required.'
      }
    }
  })

  return {
    validationErrors,
    isValid: Object.keys(validationErrors).length === 0,
  }
}

export type FormValidationPayload = {
  isValid: boolean
  validationErrors: ManagedFormState
}

export type FieldConfig = {
  label?: string
  name: string
  required?: boolean
  type: InputFieldType
}

export type ManagedFormProps = {
  fields: FieldConfig[]
  onSubmit: (payload: ManagedFormState) => void
} & FormProps

export type ManagedFormState = {
  ['key']: string
}

const ManagedForm: React.FunctionComponent<ManagedFormProps> = props => {
  const [formState, setFormState] = React.useState(initialState(props.fields))
  const [errors, setErrors] = React.useState(initialState(props.fields))

  const { fields, onSubmit } = props

  const proxiedOnSubmit = event => {
    event.preventDefault()
    const { isValid, validationErrors } = validate(fields, formState)
    if (isValid) {
      onSubmit(formState)
    } else {
      setErrors(validationErrors)
    }
  }

  const onInputChange = event => {
    const key = event.target.name
    const val = event.target.value
    if (formState.hasOwnProperty(key)) {
      setFormState(
        produce(draft => {
          draft[key] = val
        }),
      )
    }
  }

  return (
    <Form {...props} onSubmit={proxiedOnSubmit}>
      {fields.map(({ label, name, type }) => (
        <InputField
          boundValue={formState[name]}
          error={errors[name]}
          key={name}
          label={label}
          name={name}
          onInputChange={onInputChange}
          type={type}
        />
      ))}
    </Form>
  )
}

export default React.memo(ManagedForm)
