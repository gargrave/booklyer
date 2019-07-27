import * as React from 'react'
import { produce } from 'immer'

import { InputType } from '../forms.types'
import { useFormValidation, ValidationFields } from './useFormValidation'

import Form, { OptionalFormProps } from '../Form/Form'
import Select, { SelectInputTypeProps } from '../Select/Select'
import InputField from '../InputField/InputField'

export type FieldConfig = {
  label?: string
  name: string
  placeholder?: string
  required?: boolean
  selectConfig?: SelectInputTypeProps
  type: InputType
  validations?: ValidationFields
}

export type ManagedFormProps = {
  fields: FieldConfig[]
  onSubmit: (payload: ManagedFormState) => void
} & OptionalFormProps

export type ManagedFormState = {
  [key: string]: string
}

const ManagedForm: React.FunctionComponent<ManagedFormProps> = props => {
  const { disabled, fields } = props

  const {
    formState,
    setFormState,
    validatedOnSubmit,
    validationErrors,
  } = useFormValidation(props)

  const handleInputChange = React.useCallback(event => {
    const key = event.target.name
    const val = event.target.value

    if (formState.hasOwnProperty(key)) {
      setFormState(
        produce(draft => {
          draft[key] = val
        }),
      )
    }
  }, []) // eslint-disable-line

  return (
    <Form {...props} onSubmit={validatedOnSubmit}>
      {fields.map(fieldConfig => {
        const { name } = fieldConfig

        if (fieldConfig.type === InputType.select) {
          return (
            <Select
              {...fieldConfig}
              {...fieldConfig.selectConfig!}
              disabled={disabled}
              error={validationErrors[name]}
              key={fieldConfig.name}
              onChange={handleInputChange}
              value={formState[name]}
            />
          )
        }

        return (
          <InputField
            {...fieldConfig}
            disabled={disabled}
            error={validationErrors[name]}
            key={fieldConfig.name}
            onChange={handleInputChange}
            value={formState[name]}
          />
        )
      })}
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
