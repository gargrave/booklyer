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
        className={classNames({ [styles.placeholder]: !value })}
        id={name}
        name={name}
        onChange={onChange}
        value={value ? getOptionValue(value) : ''}
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
    </div>
  )
}

export default React.memo(Select)
