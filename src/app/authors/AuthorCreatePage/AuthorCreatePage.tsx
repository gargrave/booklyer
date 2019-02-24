import * as React from 'react'

import { AuthorsReduxProps } from '../authors.types'

import { useRequiredAuthentication } from 'app/auth/utils/useRequiredAuthentication'

import AuthorForm from '../components/AuthorForm/AuthorForm'

export type AuthorCreatePageProps = { history: any } & AuthorsReduxProps

const AuthorCreatePage: React.FunctionComponent<AuthorCreatePageProps> = ({
  createAuthor,
  history,
}) => {
  const { getUser } = useRequiredAuthentication(history)
  const [error, setError] = React.useState('')
  const user = getUser()

  async function handleSubmit(payload) {
    try {
      await createAuthor(user.id, payload)
      history.push('/authors')
    } catch (error) {
      setError('There was an error creating the Author.')
    }
  }

  function handleCancel() {
    history.push('/authors')
  }

  return user ? (
    <>
      <AuthorForm
        error={error}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </>
  ) : null
}

export default React.memo(AuthorCreatePage)
