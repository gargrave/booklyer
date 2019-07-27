import * as React from 'react'

import { InputType } from 'packages/common/src/forms/forms.types'
import { AuthReduxProps } from 'app/auth/auth.types'
import { BasicRouteProps } from 'app/core/core.types'
import { AppContext } from 'app/core/AppIndex/App.context'

import ManagedForm, {
  FieldConfig,
} from 'packages/common/src/forms/ManagedForm/ManagedForm'
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
]

export type LoginPageProps = {} & BasicRouteProps & AuthReduxProps

const LoginPage: React.FunctionComponent<LoginPageProps> = ({
  getAuthRequestPending,
  history,
  login,
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
          await login(email, password)
          history.push('/books')
        } catch (error) {
          setError(
            'Could not login with the provided credentials. Please try again.',
          )
        }
      }
    },
    [login], // eslint-disable-line
  )

  const handleRegisterLinkClick = React.useCallback(
    () => history.push('/account/register'),
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
        title="Log In"
      />

      <div>
        or{' '}
        <a onClick={handleRegisterLinkClick} style={{ cursor: 'pointer' }}>
          create an account
        </a>
      </div>
    </>
  )
}

export default React.memo(LoginPage)
