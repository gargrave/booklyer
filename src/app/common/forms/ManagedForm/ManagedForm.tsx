import * as React from 'react'
import { produce } from 'immer'

import { useFormValidation } from './useFormValidation'

import Form, { FormProps, OptionalFormProps } from '../Form/Form'
import InputField, { InputFieldType } from '../InputField/InputField'

export type FieldConfig = {
  label?: string
  name: string
  required?: boolean
  type: InputFieldType
  validations?: {
    minLength?: number
  }
}

export type ManagedFormProps = {
  fields: FieldConfig[]
  onSubmit: (payload: ManagedFormState) => void
} & OptionalFormProps

export type ManagedFormState = {
  [key: string]: string
}

const ManagedForm: React.FunctionComponent<ManagedFormProps> = props => {
  const {
    formState,
    setFormState,
    validatedOnSubmit,
    validationErrors,
  } = useFormValidation(props)

  const handleInputChange = event => {
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
    <Form {...props} onSubmit={validatedOnSubmit}>
      {props.fields.map(({ label, name, type }) => (
        <InputField
          boundValue={formState[name]}
          error={validationErrors[name]}
          key={name}
          label={label}
          name={name}
          onInputChange={handleInputChange}
          type={type}
        />
      ))}
    </Form>
  )
}

/**
 * A wrapper for the Form component to handle managing Form state and validation with minimal
 * additional overhead for the parent component.
 *
 * Validation types are being added on an as-needed basis, so they may not all be there yet.
 *
 * (See the demo example for an example of minimal configuration.)
 */
export default React.memo(ManagedForm)
