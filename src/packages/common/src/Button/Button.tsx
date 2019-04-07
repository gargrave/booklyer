import * as React from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'

const DEFAULT_CONFIRM_TIMEOUT = 5000

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
  /** (Optional) Amount of time after which "click to confirm" will timeout */
  extraClickTimeout?: number
  /** Whether this button should apply "type=submit" to itself */
  isSubmitBtn?: boolean
  /** Whether the button should show a loader instead of `children` */
  loading?: boolean
  /** Click handler */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Whether this button should show "click to confirm" and require a 2nd click to trigger callback */
  requireExtraClick?: boolean
  /** The type of this button. Use the `ButtonType` enum for easy access! */
  type?: ButtonType
}

const Button: React.FunctionComponent<ButtonProps> = ({
  block = false,
  children,
  disabled = false,
  extraClickTimeout = DEFAULT_CONFIRM_TIMEOUT,
  isSubmitBtn = false,
  loading = false,
  onClick,
  requireExtraClick = false,
  type = ButtonType.Primary,
}) => {
  const [isConfirming, setIsConfirming] = React.useState(false)

  React.useEffect(() => {
    let timeout

    if (isConfirming) {
      timeout = setTimeout(() => setIsConfirming(false), extraClickTimeout)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [isConfirming])

  const handleClick = React.useCallback(
    event => {
      if (requireExtraClick) {
        if (isConfirming) {
          onClick(event)
          setIsConfirming(false)
        } else {
          setIsConfirming(true)
        }
      } else {
        onClick(event)
      }
    },
    [isConfirming, onClick],
  )

  return (
    <button
      className={classNames('button', `button-${type}`, styles.button, {
        'button-block': block,
        'button-loader': loading,
      })}
      disabled={disabled}
      onClick={handleClick}
      type={isSubmitBtn ? 'submit' : 'button'}
    >
      {isConfirming ? 'Click to Confirm' : children}
    </button>
  )
}

Button.defaultProps = {
  block: false,
  disabled: false,
  loading: false,
  type: ButtonType.Primary,
}

/**
 * Basic button component. You know what it is.
 *
 * It is currently built around the [Shoelace CSS](https://shoelace.style/docs/buttons.html) button styles.
 */
export default React.memo(Button)
