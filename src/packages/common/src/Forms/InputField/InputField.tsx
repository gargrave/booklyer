import * as React from 'react'
import { clamp, classNames } from '@gargrave/garlib'

import { InputType, InputProps } from '../Input.types'

import styles from './InputField.module.scss'

export type selectConfig = {}

export type InputFieldProps = {
  maxLength?: number
  type?: InputType
} & InputProps

export const InputField: React.FC<InputFieldProps> = React.memo(
  ({
    disabled = false,
    error,
    label,
    maxLength = 255,
    name,
    onChange,
    placeholder,
    type = InputType.text,
    value,
  }) => (
    <div className="input-field">
      {label && <label htmlFor={name}>{label}</label>}

      <input
        className={classNames({ [styles.invalid]: !!error })}
        disabled={disabled}
        id={name}
        maxLength={clamp(1, 255, maxLength)}
        name={name}
        onChange={onChange}
        placeholder={placeholder || label}
        type={type}
        value={value}
      />

      {error && <p className={styles.error}>{error}</p>}
    </div>
  ),
)
