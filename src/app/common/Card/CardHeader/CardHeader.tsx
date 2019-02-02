import * as React from 'react'

import styles from './CardHeader.module.scss'

export type CardHeaderProps = {
  text: string
}

const CardHeader: React.SFC<CardHeaderProps> = ({ text }) => (
  <div className={styles.cardHeader}>{text}</div>
)

export { CardHeader as UnwrappedCardHeader }
export default React.memo(CardHeader)
