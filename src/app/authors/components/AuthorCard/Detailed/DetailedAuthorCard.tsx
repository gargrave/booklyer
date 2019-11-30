import * as React from 'react'

import { Author } from 'app/authors/authors.types'

import {
  Button,
  ButtonRow,
  ButtonType,
  Card,
  CardProps,
  CardTextLine,
  CardTextLineType,
} from 'packages/common'

export type DetailedAuthorCardProps = {
  author: Author
  onBackClick: () => void
  onEditClick: () => void
} & CardProps

export const DetailedAuthorCard: React.FC<DetailedAuthorCardProps> = React.memo(({
  author,
  onBackClick,
  onEditClick,
}) => {
  return (
    <Card>
      <CardTextLine
        text={`${author.firstName} ${author.lastName}`}
        type={CardTextLineType.Title}
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
})
