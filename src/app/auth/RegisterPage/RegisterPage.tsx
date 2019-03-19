import * as React from 'react'

import { AuthReduxProps } from '../auth.types'
import { InputType } from 'app/common/forms/forms.types'

import ManagedForm, {
  FieldConfig,
} from 'app/common/forms/ManagedForm/ManagedForm'

const fields: FieldConfig[] = [
  {
    // TODO: need to add email validation
    label: 'Email',
    name: 'email',
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
    label: 'Confirm Password',
    name: 'passwordConfirm',
    required: true,
    type: InputType.password,
    validations: {
      mustMatch: 'password',
    },
  },
]

export type RegisterPageProps = {
  history: any
} & AuthReduxProps

const RegisterPage: React.SFC<RegisterPageProps> = () => {
  const [error, setError] = React.useState('')

  async function handleSubmit(payload) {
    // TODO: wire up the process on registering
    console.log(
      `%cREGSITER`,
      'color:green;font-size:12px;background:lightyellow;padding:2px 4px;',
    )
  }

  return (
    <>
      <ManagedForm
        error={error}
        fields={fields}
        onSubmit={handleSubmit}
        title="Register"
      />
    </>
  )
}

export default RegisterPage
