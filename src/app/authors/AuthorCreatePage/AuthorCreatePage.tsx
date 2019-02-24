import * as React from 'react'

import { AuthorsReduxProps } from '../authors.types'

import { useRequiredAuthentication } from 'app/auth/utils/useRequiredAuthentication'

import Button from 'app/common/Button/Button'
import AuthorForm from '../components/AuthorForm/AuthorForm'

export type AuthorCreatePageProps = { history: any } & AuthorsReduxProps

const AuthorCreatePage: React.FunctionComponent<AuthorCreatePageProps> = ({
  history,
}) => {
  const { getUser } = useRequiredAuthentication(history)
  const [error, setError] = React.useState('')
  const user = getUser()

  async function handleSubmit(payload) {
    const { firstName, lastName } = payload
    console.log(
      `%ccreateAuthor:`,
      'color:green;font-size:12px;background:lightyellow;padding:2px 4px;',
    )
    console.log({ firstName, lastName })
  }

  return user ? (
    <>
      <AuthorForm error={error} onSubmit={handleSubmit} />
    </>
  ) : null
}

export default React.memo(AuthorCreatePage)
