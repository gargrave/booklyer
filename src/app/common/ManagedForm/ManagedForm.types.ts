import { InputFieldType } from '../InputField/InputField'

export type FieldConfig = {
  label?: string
  name: string
  required?: boolean
  type: InputFieldType
  validations?: {
    minLength?: number
  }
}

export type ManagedFormState = {
  ['key']: string
}
