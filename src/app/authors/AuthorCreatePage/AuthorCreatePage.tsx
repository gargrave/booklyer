import * as React from 'react'

import { AuthorsReduxProps } from '../authors.types'

import { useRequiredAuthentication } from 'app/auth/utils/useRequiredAuthentication'

import Button from 'app/common/Button/Button'

export type AuthorCreatePageProps = { history: any } & AuthorsReduxProps

const AuthorCreatePage: React.FunctionComponent<AuthorCreatePageProps> = ({
  history,
}) => {
  const { getUser } = useRequiredAuthentication(history)
  const user = getUser()

  return user ? <div>Hello, AuthorCreatePage!</div> : null
}

export default React.memo(AuthorCreatePage)
