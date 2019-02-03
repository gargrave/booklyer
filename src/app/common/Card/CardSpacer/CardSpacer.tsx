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
  size?: string
}

const CardSpacer: React.SFC<CardSpacerProps> = ({ size = 'medium' }) => (
  <div className={styles[size]} />
)

CardSpacer.defaultProps = {
  size: CardSpacerSize.Medium,
}

export { CardSpacer as UnwrappedCardSpacer }
/**
 * A simple spacing element to add pre-defined spaces between other elements.
 *
 * Rather than needing to directly import it, it can be used inside a card as `Card.Spacer`.
 */
export default React.memo(CardSpacer)
