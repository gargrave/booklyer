import * as React from 'react'

import { User } from 'app/auth/auth.types'
import { AppContext } from 'app/core/AppIndex/App.context'
import { BasicRouteProps } from 'app/core/core.types'

import { FieldConfig, InputType, ManagedForm } from 'packages/common'
import { Loader } from 'app/core/components'

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
  getAuthRequestPending: () => boolean
  register: (email: string, password: string) => Promise<User>
} & BasicRouteProps

export const RegisterPage: React.FC<RegisterPageProps> = ({
  getAuthRequestPending,
  history,
  register,
}) => {
  const { appInitialized, user } = React.useContext(AppContext)
  const [error, setError] = React.useState('')
  const loading = !appInitialized || getAuthRequestPending()

  React.useEffect(() => {
    if (appInitialized && user) {
      history.push('/books')
    }
  }, [appInitialized, user]) // eslint-disable-line

  const handleSubmit = React.useCallback(
    async payload => {
      const { email, password } = payload
      if (email && password) {
        setError('')
        try {
          await register(email, password)
          history.push('/authors')
        } catch (error) {
          setError('Registration could not be completed at this time.')
        }
      }
    },
    [register], // eslint-disable-line
  )

  const handleLoginClick = React.useCallback(
    () => history.push('/account/login'),
    [history],
  )

  const renderLoader = React.useCallback(() => <Loader size={44} />, [])

  return appInitialized && user ? null : (
    <>
      <ManagedForm
        error={error}
        fields={fields}
        loading={loading}
        onSubmit={handleSubmit}
        renderLoader={renderLoader}
        title="Register"
      />

      <div>
        or{' '}
        <a onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
          sign in to your account
        </a>
      </div>
    </>
  )
}
