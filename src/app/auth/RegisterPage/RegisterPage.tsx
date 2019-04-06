import * as React from 'react'

import { AppContext } from 'app/core/AppIndex/App.context'
import { BasicRouteProps } from 'app/core/core.types'
import { InputType } from 'app/common/forms/forms.types'
import { AuthReduxProps } from '../auth.types'

import ManagedForm, {
  FieldConfig,
} from 'app/common/forms/ManagedForm/ManagedForm'
import Loader from 'app/common/Loader/Loader'

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

export type RegisterPageProps = {} & BasicRouteProps & AuthReduxProps

const RegisterPage: React.SFC<RegisterPageProps> = ({
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
  }, [appInitialized, user])

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
    [register],
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

export default RegisterPage
