import * as React from 'react'

import { Author } from '../../../authors.types'

import Card, { CardProps } from 'packages/common/src/Card/Card'
import ButtonRow from 'packages/common/src/ButtonRow/ButtonRow'
import Button, { ButtonType } from 'packages/common/src/Button/Button'

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
