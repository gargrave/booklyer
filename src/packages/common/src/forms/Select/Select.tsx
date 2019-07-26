/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import classNames from 'classnames'

import { InputProps } from '../forms.types'

import styles from './Select.module.scss'

export type SelectInputTypeProps = {
  getOptionText: (option: any) => string
  getOptionValue: (option: any) => string
  options: any[]
}

export type SelectProps = {} & SelectInputTypeProps & InputProps

const Select: React.FunctionComponent<SelectProps> = ({
  disabled,
  error,
  getOptionText,
  getOptionValue,
  label = '',
  name,
  onChange,
  options,
  placeholder,
  value,
}) => {
  return (
    <div className="input-field">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        className={classNames({
          [styles.placeholder]: !value,
          [styles.invalid]: !!error,
        })}
        disabled={disabled}
        id={name}
        name={name}
        onChange={onChange}
        value={value || ''}
      >
        {!value && <option value="-1">{placeholder}</option>}
        {options.map(option => {
          const optionValue = getOptionValue(option)
          return (
            <option key={optionValue} value={optionValue}>
              {getOptionText(option)}
            </option>
          )
        })}
      </select>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default React.memo(Select)
