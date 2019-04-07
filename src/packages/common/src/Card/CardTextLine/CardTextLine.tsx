import * as React from 'react'
import classNames from 'classnames'

import styles from './CardTextLine.module.scss'

export enum CardTextLineType {
  Subtext = 'subtext',
  Text = 'text',
  Title = 'title',
}

export type CardTextLineProps = {
  /** The text to display within the line. */
  text: string
  /**
   * The type/styling to apply to this instance.
   *
   * Use the `CardTextLineType` enum to specify this prop.
   */
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
/**
 * A simple helper to display a nicely-formatted single line of text within a card.
 *
 * Rather than needing to directly import it, it can be used inside a card as `Card.TextLine`.
 */
export default React.memo(CardTextLine)
