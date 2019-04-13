import * as React from 'react'

import styles from './ButtonRow.module.scss'

export type ButtonRowProps = {
  children: React.ReactNode
  styleOverride?: {}
}

const ButtonRow: React.FunctionComponent<ButtonRowProps> = ({
  children,
  styleOverride = {},
}) => (
  <div className={styles.buttonRow} style={styleOverride}>
    {children}
  </div>
)

export default React.memo(ButtonRow)
