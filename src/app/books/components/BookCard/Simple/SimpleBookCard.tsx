import * as React from 'react'

import { Book } from '../../../books.types'

import { Card, CardTextLine, CardTextLineType } from 'packages/common'

export type SimpleBookCardProps = {
  book: Book
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  showAuthor?: boolean
}

const SimpleBookCard: React.FC<SimpleBookCardProps> = ({
  book,
  onClick,
  showAuthor,
}) => {
  const { author, sortBy, title } = book
  const authorName = `${author.firstName} ${author.lastName}`

  return (
    <Card hoverable={true} onClick={onClick}>
      <CardTextLine text={title} type={CardTextLineType.Title} />
      {showAuthor && <CardTextLine text={authorName} />}
      {sortBy && (
        <CardTextLine
          text={`Sorted by: ${sortBy}`}
          type={CardTextLineType.Subtext}
        />
      )}
    </Card>
  )
}

export default React.memo(SimpleBookCard)
