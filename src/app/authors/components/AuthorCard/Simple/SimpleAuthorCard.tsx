import * as React from 'react'

import { Author } from 'app/authors/authors.types'

import {
  Card,
  CardProps,
  CardTextLine,
  CardTextLineType,
} from 'packages/common'

export type SimpleAuthorCardProps = {
  author: Author
  bookCount: number
} & CardProps

export const SimpleAuthorCard: React.FC<SimpleAuthorCardProps> = React.memo(
  ({ author, bookCount, onClick }) => {
    const countString = React.useMemo(
      () => {
        const suffix = bookCount === 1 ? '' : 's'
        return `${bookCount} book${suffix}`
      },
      [bookCount],
    )

    return (
      <Card hoverable={true} onClick={onClick}>
        <CardTextLine
          text={`${author.firstName} ${author.lastName}`}
          type={CardTextLineType.Title}
        />

        <CardTextLine text={countString} type={CardTextLineType.Text} />
      </Card>
    )
  },
)
