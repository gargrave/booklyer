import * as React from 'react'

import { Author } from '../../../authors.types'

import { Button, ButtonRow, ButtonType, Card, CardProps } from 'packages/common'

export type DetailedAuthorCardProps = {
  author: Author
  onBackClick: () => void
  onEditClick: () => void
} & CardProps

const DetailedAuthorCard: React.FunctionComponent<DetailedAuthorCardProps> = ({
  author,
  onBackClick,
  onEditClick,
}) => {
  return (
    <Card>
      <Card.TextLine
        text={`${author.firstName} ${author.lastName}`}
        type={Card.TextLineType.Title}
      />

      <ButtonRow>
        <Button onClick={onBackClick} type={ButtonType.Light}>
          Back
        </Button>
        <Button onClick={onEditClick} type={ButtonType.Primary}>
          Edit
        </Button>
      </ButtonRow>
    </Card>
  )
}

export default React.memo(DetailedAuthorCard)
