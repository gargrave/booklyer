import * as React from 'react'

import { Book } from '../../../books.types'

import Button, { ButtonType } from 'app/common/Button/Button'
import ButtonRow from 'app/common/ButtonRow/ButtonRow'
import Card, { CardProps } from 'app/common/Card/Card'

export type SimpleBookCardProps = {
  book: Book
  onBackClick: () => void
  onEditClick: () => void
} & CardProps

const SimpleBookCard: React.SFC<SimpleBookCardProps> = ({
  book,
  onBackClick,
  onEditClick,
}) => {
  const { author, sortBy, title } = book
  // TODO: this should not need to be optional once we get better selectors for books
  const authorName = author ? `${author.firstName} ${author.lastName}` : ''

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
