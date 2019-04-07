import * as React from 'react'

import { Book } from '../../../books.types'

import Button, { ButtonType } from 'packages/common/src/Button/Button'
import ButtonRow from 'packages/common/src/ButtonRow/ButtonRow'
import Card, { CardProps } from 'packages/common/src/Card/Card'

export type DetailedBookCardProps = {
  book: Book
  onBackClick: () => void
  onEditClick: () => void
} & CardProps

const SimpleBookCard: React.SFC<DetailedBookCardProps> = ({
  book,
  onBackClick,
  onEditClick,
}) => {
  const { author, sortBy, title } = book
  const authorName = `${author.firstName} ${author.lastName}`

  return (
    <Card>
      <Card.TextLine text={title} type={Card.TextLineType.Title} />
      <Card.TextLine text={authorName} />
      {sortBy && (
        <Card.TextLine
          text={`Sorted by: ${sortBy}`}
          type={Card.TextLineType.Subtext}
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
