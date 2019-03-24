import * as React from 'react'

import { Author } from '../../authors.types'

import Card, { CardProps } from 'app/common/Card/Card'

export type AuthorCardProps = {
  author: Author
} & CardProps

const AuthorCard: React.SFC<AuthorCardProps> = ({ author, onClick }) => (
  <Card hoverable={true} onClick={onClick}>
    <Card.TextLine
      text={`${author.firstName} ${author.lastName}`}
      type={Card.TextLineType.Title}
    />
  </Card>
)

export default React.memo(AuthorCard)
