import * as React from 'react'
import classNames from 'classnames'

import styles from './Alert.module.scss'

export enum AlertType {
  danger = 'danger',
  dark = 'dark',
  info = 'info',
  light = 'light',
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  warning = 'warning',
}

export type AlertProps = {
  children?: React.ReactNode
  /** The primary message to be displayed in the Alert */
  message: string
  /** The type/style of the alert. Use the `AlertType` enum for this value. */
  type?: AlertType
}

/**
 * Basic Alert component. This is currently mostly just a wrapper around
 * the Alert styles defined by [Shoelace](https://shoelace.style/docs/alerts.html).
 */
export const Alert: React.FunctionComponent<AlertProps> = React.memo(
  ({ children, message, type = AlertType.primary }) => (
    <div
      className={classNames(`alert alert-${type}`, styles.alertContainer)}
      role="alert"
    >
      <span>{message}</span>
      <span>{children}</span>
    </div>
  ),
)
