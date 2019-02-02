import * as React from 'react'

import { Author } from '../../authors.types'

import Card from 'app/common/Card/Card'

export type AuthorProps = {
  author: Author
}

const AuthorCard: React.SFC<AuthorProps> = ({ author }) => (
  <Card hoverable={true}>
    <Card.TextLine
      text={`${author.firstName} ${author.lastName}`}
      type={Card.TextLineType.Title}
    />
  </Card>
)

export { AuthorCard as UnwrappedAuthor }
export default React.memo(AuthorCard)
