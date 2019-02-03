import * as React from 'react'
import classNames from 'classnames'

import CardHeader from './CardHeader/CardHeader'
import CardSpacer from './CardSpacer/CardSpacer'
import CardTextLine, { CardTextLineType } from './CardTextLine/CardTextLine'
import CardTextList from './CardTextList/CardTextList'

import styles from './Card.module.scss'

export type CardProps = {
  children?: React.ReactNode
  /**
   * Whether the card should add hover styles on mouse over. This includes
   * a different background color, as well as the `cursor: pointer` style.
   */
  hoverable?: boolean
  /**
   * (Optional) Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

/**
 * Basic Card component.
 *
 * It can accept any valid React child, but also note that there are several sub-components
 * which can be used as static members to build the contents of the Card.
 *
 * For example:
 *  - `Card.Header` adds a big, bold title to the card
 *  - `Card.TextLine` adds a single line of text
 *  - `Card.TextList` adds a series of title/value pairs
 *  - `Card.Spacer` adds pre-defined spacing between other objects
 */
export default class Card extends React.PureComponent<CardProps> {
  static Header = CardHeader
  static Spacer = CardSpacer
  static TextLine = CardTextLine
  static TextLineType = CardTextLineType
  static TextList = CardTextList

  static defaultProps = {
    hoverable: false,
    onClick: () => void 0,
  }

  render() {
    const { children, hoverable = false, onClick } = this.props
    return (
      <div
        className={classNames(styles.card, { [styles.hoverable]: hoverable })}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }
}
