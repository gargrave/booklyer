import * as React from 'react'
import classNames from 'classnames'

import { clamp } from 'utils/mathHelpers'

import styles from './InputField.module.scss'

export enum InputType {
  password = 'password',
  text = 'text',
}

export type InputFieldProps = {
  boundValue: string
  disabled?: boolean
  error?: string
  label?: string
  maxLength?: number
  name: string
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: InputType
}

const InputField: React.FunctionComponent<InputFieldProps> = ({
  boundValue,
  disabled = false,
  error,
  label,
  maxLength = 255,
  name,
  onInputChange,
  placeholder,
  type = InputType.text,
}) => (
  <div className="input-field">
    {label && <label htmlFor={name}>{label}:</label>}

    <input
      className={classNames({ [styles.invalid]: !!error })}
      disabled={disabled}
      id={name}
      maxLength={clamp(maxLength, 1, 255)}
      name={name}
      onChange={onInputChange}
      placeholder={placeholder}
      type={type}
      value={boundValue}
    />

    {error && <p className={styles.error}>{error}</p>}
  </div>
)

InputField.defaultProps = {
  disabled: false,
  maxLength: 255,
  type: InputType.text,
}

export { InputField as UnwrappedInputField }
export default React.memo(InputField)
