import * as React from 'react'
import { produce } from 'immer'

import { useFormValidation } from './useFormValidation'

import Form, { FormProps } from '../Form/Form'
import InputField from '../InputField/InputField'
import { FieldConfig, ManagedFormState } from './ManagedForm.types'

export type ManagedFormProps = {
  fields: FieldConfig[]
  onSubmit: (payload: ManagedFormState) => void
} & FormProps

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

export default React.memo(ManagedForm)
