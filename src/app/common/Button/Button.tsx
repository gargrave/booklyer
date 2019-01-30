import * as React from 'react'

export type ButtonProps = {
  children: React.ReactNode
}

const Button: React.SFC<ButtonProps> = ({ children }) => (
  <button>{children}</button>
)

export { Button as UnwrappedButton }
export default Button
