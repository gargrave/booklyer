import * as React from 'react'
import { classNames } from '@gargrave/garlib'

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
 * It can accept any valid React child, but also note that there are several
 * pre-built sub-components that you can use to nicely match the default Card styles:
 *
 * - CardHeader
 * - CardSpacer
 * - CardTextLine
 * - CardTextList
 */
export const Card: React.FC<CardProps> = React.memo(
  ({ children, hoverable, onClick }) => {
    return (
      <div
        className={classNames(styles.card, { [styles.hoverable]: hoverable })}
        onClick={onClick}
      >
        {children}
      </div>
    )
  },
)
