import * as React from 'react'

import { Author } from '../../../authors.types'

import Card, { CardProps } from 'packages/common/src/Card/Card'

export type SimpleAuthorCardProps = {
  author: Author
} & CardProps

const SimpleAuthorCard: React.FunctionComponent<SimpleAuthorCardProps> = ({
  author,
  onClick,
}) => (
  <Card hoverable={true} onClick={onClick}>
    <Card.TextLine
      text={`${author.firstName} ${author.lastName}`}
      type={Card.TextLineType.Title}
    />
  </Card>
)

export default React.memo(SimpleAuthorCard)
