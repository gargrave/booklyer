import * as React from 'react'

import styles from './ButtonRow.module.scss'

export type ButtonRowProps = {
  children: React.ReactNode
}

const ButtonRow: React.FunctionComponent<ButtonRowProps> = ({ children }) => (
  <div className={styles.buttonRow}>{children}</div>
)

export default React.memo(ButtonRow)
