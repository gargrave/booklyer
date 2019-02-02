import * as React from 'react'
import classNames from 'classnames'

import styles from './CardTextLine.module.scss'

export enum CardTextLineType {
  Subtext = 'subtext',
  Text = 'text',
  Title = 'title',
}

export type CardTextLineProps = {
  text: string
  type?: CardTextLineType
}

const CardTextLine: React.SFC<CardTextLineProps> = ({
  text,
  type = CardTextLineType.Text,
}) => (
  <div className={classNames(styles.cardTextLine, styles[type])}>{text}</div>
)

CardTextLine.defaultProps = {
  type: CardTextLineType.Text,
}

export { CardTextLine as UnwrappedCardTextLine }
export default React.memo(CardTextLine)
