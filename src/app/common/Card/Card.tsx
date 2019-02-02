import * as React from 'react'
import classNames from 'classnames'

import CardTextLine, { CardTextLineType } from './CardTextLine/CardTextLine'

import styles from './Card.module.scss'

export type CardProps = {
  children?: React.ReactNode
  hoverable?: boolean
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

export default class Card extends React.PureComponent<CardProps> {
  static TextLine = CardTextLine
  static TextLineType = CardTextLineType

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
