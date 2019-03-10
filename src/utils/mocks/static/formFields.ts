import { InputType } from 'app/common/forms/InputField/InputField'

const formFields = [
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

export { formFields }
