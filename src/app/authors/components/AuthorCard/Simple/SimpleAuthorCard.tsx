import * as React from 'react'

import { Author } from '../../../authors.types'

import {
  Card,
  CardProps,
  CardTextLine,
  CardTextLineType,
} from 'packages/common'

export type SimpleAuthorCardProps = {
  author: Author
  getBookCount: (authorId: string) => number
} & CardProps

const SimpleAuthorCard: React.FunctionComponent<SimpleAuthorCardProps> = ({
  author,
  getBookCount,
  onClick,
}) => {
  const countString = React.useMemo(() => {
    const count = getBookCount(author.id)
    const suffix = count === 1 ? '' : 's'
    return `${count} book${suffix}`
  }, [author.id, getBookCount])

  return (
    <Card hoverable={true} onClick={onClick}>
      <CardTextLine
        text={`${author.firstName} ${author.lastName}`}
        type={CardTextLineType.Title}
      />

      <CardTextLine text={countString} type={CardTextLineType.Text} />
    </Card>
  )
}

export default React.memo(SimpleAuthorCard)
