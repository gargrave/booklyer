import * as React from 'react'

import styles from './CardHeader.module.scss'

export type CardHeaderProps = {
  /** The text to show in the header */
  text: string
}

/**
 * A simple pre-styled component for use as a title/header for Cards.
 */
export const CardHeader: React.FC<CardHeaderProps> = React.memo(({ text }) => (
  <div className={styles.cardHeader}>{text}</div>
))
