import * as React from 'react'

import { Author } from '../../../authors.types'

import Card, { CardProps } from 'app/common/Card/Card'

export type DetailedAuthorCardProps = {
  author: Author
} & CardProps

const DetailedAuthorCard: React.FunctionComponent<DetailedAuthorCardProps> = ({
  author,
}) => {
  return (
    <Card>
      <Card.TextLine
        text={`${author.firstName} ${author.lastName}`}
        type={Card.TextLineType.Title}
      />
    </Card>
  )
}

export default React.memo(DetailedAuthorCard)
