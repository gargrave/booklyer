import * as React from 'react'

import { InputType } from 'app/common/forms/forms.types'
import { AuthReduxProps } from '../auth.types'

import ManagedForm from 'app/common/forms/ManagedForm/ManagedForm'

const fields = [
  {
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
