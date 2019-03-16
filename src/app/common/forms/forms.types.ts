export enum InputType {
  password = 'password',
  select = 'select',
  text = 'text',
}

export type InputProps = {
  disabled?: boolean
  error?: string
  label?: string
  name: string
  onChange: (event: React.ChangeEvent) => void
  placeholder?: string
  value: any
}
