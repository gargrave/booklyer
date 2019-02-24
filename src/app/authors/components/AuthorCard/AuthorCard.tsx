import * as React from 'react'

import { Author } from '../../authors.types'

import Card from 'app/common/Card/Card'

export type AuthorCardProps = {
  author: Author
}

const AuthorCard: React.SFC<AuthorCardProps> = ({ author }) => (
  <Card hoverable={true}>
    <Card.TextLine
      text={`${author.firstName} ${author.lastName}`}
      type={Card.TextLineType.Title}
    />
  </Card>
)

export default React.memo(AuthorCard)
