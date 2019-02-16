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

const Alert: React.FunctionComponent<AlertProps> = ({
  children,
  message,
  type = AlertType.primary,
}) => (
  <div className={classNames(`alert alert-${type}`, styles.alertContainer)}>
    <span>{message}</span>
    <span>{children}</span>
  </div>
)

Alert.defaultProps = {
  type: AlertType.primary,
}

/**
 * Basic Alert component. This is currently mostly just a wrapper around
 * the Alert styles defined by [Shoelace](https://shoelace.style/docs/alerts.html).
 */
export default React.memo(Alert)
