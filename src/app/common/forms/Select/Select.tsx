import * as React from 'react'
import classNames from 'classnames'

import styles from './Select.module.scss'

export type SelectProps = {
  getOptionText: (option: any) => string
  getOptionValue: (option: any) => string
  label: string
  name: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  options: any[]
  placeholder: string
  selected: any
}

const Select: React.FunctionComponent<SelectProps> = ({
  getOptionText,
  getOptionValue,
  label,
  name,
  onChange,
  options,
  placeholder,
  selected,
}) => {
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <select
        className={classNames({ [styles.placeholder]: !selected })}
        id={name}
        name={name}
        onChange={onChange}
        value={selected ? getOptionValue(selected) : ''}
      >
        {!selected && <option value="-1">{placeholder}</option>}
        {options.map(option => {
          const value = getOptionValue(option)
          return (
            <option key={value} value={value}>
              {getOptionText(option)}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default React.memo(Select)
