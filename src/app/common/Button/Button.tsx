import * as React from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'

export enum ButtonType {
  Danger = 'danger',
  Dark = 'dark',
  Info = 'info',
  Light = 'light',
  Link = 'link',
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Warning = 'warning',
}

export type ButtonProps = {
  /** Whether to return as a block button (full width) */
  block?: boolean
  children: React.ReactNode
  /** Whether "disabled" state should be applied */
  disabled?: boolean
  /** Whether the button should show a loader instead of `children` */
  loading?: boolean
  /** Click handler */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** The type of this button. Use the `ButtonType` enum for easy access! */
  type?: ButtonType
}

const Button: React.SFC<ButtonProps> = ({
  block = false,
  children,
  disabled = false,
  loading = false,
  onClick,
  type = ButtonType.Primary,
}) => (
  <button
    className={classNames('button', `button-${type}`, styles.button, {
      'button-block': block,
      'button-loader': loading,
    })}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
)

Button.defaultProps = {
  block: false,
  disabled: false,
  loading: false,
  type: ButtonType.Primary,
}

export { Button as UnwrappedButton }
/**
 * Basic button component. You know what it is.
 *
 * It is currently built around the [Shoelace CSS](https://shoelace.style/docs/buttons.html) button styles.
 */
export default Button
