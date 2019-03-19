import * as React from 'react'

import { InputType } from 'app/common/forms/forms.types'
import { AuthReduxProps } from '../auth.types'

import Loader from 'app/common/Loader/Loader'
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
]

export type LoginPageProps = {
  history: any
} & AuthReduxProps

const LoginPage: React.FunctionComponent<LoginPageProps> = ({
  getAuthRequestPending,
  history,
  login,
}) => {
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(getAuthRequestPending())
  }, [getAuthRequestPending])

  const handleSubmit = async payload => {
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
  }

  const renderLoader = React.useCallback(() => <Loader size={44} />, [])

  return (
    <>
      <ManagedForm
        error={error}
        fields={fields}
        loading={loading}
        onSubmit={handleSubmit}
        renderLoader={renderLoader}
        title="Log In"
      />
    </>
  )
}

export default React.memo(LoginPage)
