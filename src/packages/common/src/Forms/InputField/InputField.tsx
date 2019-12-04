import * as React from 'react'
import { classNames } from '@gargrave/garlib'

import { InputType, InputProps } from '../Input.types'

import { clamp } from 'utils/mathHelpers'

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
        maxLength={clamp(maxLength, 1, 255)}
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
