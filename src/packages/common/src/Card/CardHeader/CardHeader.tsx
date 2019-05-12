import * as React from 'react'

import styles from './CardHeader.module.scss'

export type CardHeaderProps = {
  /** The text to show in the header */
  text: string
}

const CardHeader: React.SFC<CardHeaderProps> = ({ text }) => (
  <div className={styles.cardHeader}>{text}</div>
)

/**
 * A simple pre-styled component for use as a title/header for Cards.
 *
 * Rather than needing to directly import it, it can be used inside a card as `Card.Header`.
 */
export default React.memo(CardHeader)
