import * as React from 'react'

import { DetailRouteProps } from 'app/core/core.types'
import { AuthorsReduxProps } from '../authors.types'

import { DetailedAuthorCard } from '../components/AuthorCard'

export type AuthorDetailPageProps = {} & DetailRouteProps & AuthorsReduxProps

const AuthorDetailPage: React.FunctionComponent<AuthorDetailPageProps> = ({
  getAuthorById,
  match,
}) => {
  const id = match.params.id
  const author = getAuthorById(id)

  return author ? (
    <div>
      <DetailedAuthorCard author={author} />
    </div>
  ) : null
}

export default React.memo(AuthorDetailPage)
