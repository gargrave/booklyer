import { InputType } from 'packages/common'

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
  {
    label: 'TestSelect',
    name: 'testSelect',
    selectConfig: {
      getOptionText: item => item,
      getOptionValue: item => item,
      options: ['A', 'B', 'C'],
    },
    type: InputType.select,
  },
]

export { formFields }
