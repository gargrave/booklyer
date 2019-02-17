import { InputFieldType } from 'app/common/forms/InputField/InputField'

const formFields = [
  {
    label: 'Username',
    name: 'username',
    required: true,
    type: InputFieldType.text,
    validations: {
      minLength: 8,
    },
  },
  {
    label: 'Password',
    name: 'password',
    required: true,
    type: InputFieldType.password,
    validations: {
      minLength: 8,
    },
  },
]

export { formFields }
