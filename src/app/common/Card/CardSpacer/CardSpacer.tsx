import * as React from 'react'

import styles from './CardSpacer.module.scss'

export enum CardSpacerSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type CardSpacerProps = {
  size?: string
}

const CardSpacer = ({ size = 'medium' }) => <div className={styles[size]} />

CardSpacer.defaultProps = {
  size: CardSpacerSize.Medium,
}

export { CardSpacer as UnwrappedCardSpacer }
export default React.memo(CardSpacer)
