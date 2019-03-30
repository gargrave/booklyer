import * as React from 'react'

import { Book } from '../../../books.types'

import Card from 'app/common/Card/Card'

export type SimpleBookCardProps = {
  book: Book
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  showAuthor?: boolean
}

const SimpleBookCard: React.SFC<SimpleBookCardProps> = ({
  book,
  onClick,
  showAuthor,
}) => {
  const { author, sortBy, title } = book
  // TODO: this should not need to be optional once we get better selectors for books
  const authorName = author ? `${author.firstName} ${author.lastName}` : ''

  return (
    <Card hoverable={true} onClick={onClick}>
      <Card.TextLine text={title} type={Card.TextLineType.Title} />
      {showAuthor && <Card.TextLine text={authorName} />}
      {sortBy && (
        <Card.TextLine
          text={`Sorted by: ${sortBy}`}
          type={Card.TextLineType.Subtext}
        />
      )}
    </Card>
  )
}

export default React.memo(SimpleBookCard)