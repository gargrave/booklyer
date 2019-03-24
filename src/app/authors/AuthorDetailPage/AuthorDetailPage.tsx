import * as React from 'react'

import { DetailRouteProps } from 'app/core/core.types'
import { AuthorsReduxProps } from '../authors.types'

export type AuthorDetailPageProps = {} & DetailRouteProps & AuthorsReduxProps

const AuthorDetailPage: React.FunctionComponent<AuthorDetailPageProps> = ({
  getAuthorById,
  match,
}) => {
  const id = match.params.id
  const author = getAuthorById(id)
  return <div>Hello, AuthorDetailPage!</div>
}

export default React.memo(AuthorDetailPage)
