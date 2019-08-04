import * as React from 'react'

import { Book } from '../../../books.types'

import {
  Button,
  ButtonRow,
  ButtonType,
  Card,
  CardProps,
  CardTextLine,
  CardTextLineType,
} from 'packages/common'

export type DetailedBookCardProps = {
  book: Book
  onBackClick: () => void
  onEditClick: () => void
} & CardProps

const SimpleBookCard: React.FC<DetailedBookCardProps> = ({
  book,
  onBackClick,
  onEditClick,
}) => {
  const { author, sortBy, title } = book
  const authorName = `${author.firstName} ${author.lastName}`

  return (
    <Card>
      <CardTextLine text={title} type={CardTextLineType.Title} />
      <CardTextLine text={authorName} />
      {sortBy && (
        <CardTextLine
          text={`Sorted by: ${sortBy}`}
          type={CardTextLineType.Subtext}
        />
      )}

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

export default React.memo(SimpleBookCard)
