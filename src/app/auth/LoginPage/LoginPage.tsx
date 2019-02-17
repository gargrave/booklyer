import * as React from 'react'

import { AuthReduxProps } from '../auth.types'

import { InputFieldType } from 'app/common/forms/InputField/InputField'
import ManagedForm from 'app/common/forms/ManagedForm/ManagedForm'

export type LoginPageProps = {} & AuthReduxProps

const fields = [
  {
    label: 'Email',
    name: 'email',
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

const LoginPage: React.FunctionComponent<LoginPageProps> = ({
  getUser,
  login,
}) => {
  const [error, setError] = React.useState('')

  const onSubmit = async payload => {
    const { email, password } = payload
    if (email && password) {
      try {
        await login(email, password)
      } catch (error) {
        setError(
          'Could not login with the provided credentials. Please try again.',
        )
      }
    }
  }

  return (
    <>
      <ManagedForm
        error={error}
        fields={fields}
        onSubmit={onSubmit}
        title="Log In"
      />
    </>
  )
}

export default React.memo(LoginPage)
