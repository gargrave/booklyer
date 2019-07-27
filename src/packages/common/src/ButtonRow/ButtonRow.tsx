import * as React from 'react'

import styles from './ButtonRow.module.scss'

export type ButtonRowProps = {
  children: React.ReactNode
  styleOverride?: {}
}

export const ButtonRow: React.FunctionComponent<ButtonRowProps> = React.memo(
  ({ children, styleOverride = {} }) => (
    <div className={styles.buttonRow} style={styleOverride}>
      {children}
    </div>
  ),
)
