import * as React from 'react'

import styles from './CardSpacer.module.scss'

export enum CardSpacerSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type CardSpacerProps = {
  /**
   * The size of the space to create.
   *
   * Use the `CardSpacerSize` enum to specify this prop.
   */
  size?: CardSpacerSize
}

/**
 * A simple spacing element to add pre-defined spaces between other elements.
 *
 * Rather than needing to directly import it, it can be used inside a card as `Card.Spacer`.
 */
export const CardSpacer: React.FC<CardSpacerProps> = React.memo(
  ({ size = CardSpacerSize.Medium }) => {
    return <div className={styles[size]} />
  },
)
