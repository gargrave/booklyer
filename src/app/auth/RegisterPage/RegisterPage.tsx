import * as React from 'react'

import { AuthReduxProps } from '../auth.types'
import { InputType } from 'app/common/forms/forms.types'

import ManagedForm, {
  FieldConfig,
} from 'app/common/forms/ManagedForm/ManagedForm'
import Loader from 'app/common/Loader/Loader'

import { useUnauthenticated } from '../utils/useUnauthenticated'

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

const RegisterPage: React.SFC<RegisterPageProps> = ({
  getAuthRequestPending,
  history,
  register,
}) => {
  const { getUser } = useUnauthenticated(history, '/books')
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(getAuthRequestPending())
  }, [getAuthRequestPending])

  async function handleSubmit(payload) {
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
  }

  const renderLoader = React.useCallback(() => <Loader size={44} />, [])

  return getUser() ? null : (
    <>
      <ManagedForm
        error={error}
        fields={fields}
        loading={loading}
        onSubmit={handleSubmit}
        renderLoader={renderLoader}
        title="Register"
      />
    </>
  )
}

export default RegisterPage
