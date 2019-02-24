import * as React from 'react'

import { AuthReduxProps } from '../auth.types'

import { InputFieldType } from 'app/common/forms/InputField/InputField'
import ManagedForm from 'app/common/forms/ManagedForm/ManagedForm'

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

export type LoginPageProps = {} & AuthReduxProps

const LoginPage: React.FunctionComponent<LoginPageProps> = ({ login }) => {
  const [error, setError] = React.useState('')

  const handleSubmit = async payload => {
    const { email, password } = payload
    if (email && password) {
      setError('')
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
        onSubmit={handleSubmit}
        title="Log In"
      />
    </>
  )
}

export default React.memo(LoginPage)
