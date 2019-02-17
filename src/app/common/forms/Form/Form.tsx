import * as React from 'react'

import Alert, { AlertType } from 'app/common/Alert/Alert'
import Button, { ButtonType } from 'app/common/Button/Button'
import ButtonRow from '../../ButtonRow/ButtonRow'

import styles from './Form.module.scss'

export type FormSubmitEvent =
  | React.FormEvent<HTMLFormElement>
  | React.MouseEvent<HTMLButtonElement>

export type FormProps = {
  cancelBtnText?: string
  children?: React.ReactNode
  classes?: string[]
  disabled?: boolean
  error?: string
  onCancel?: () => void
  onSubmit: (event: FormSubmitEvent) => void
  submitBtnText?: string
  submitDisabled?: boolean
  title?: string
}

const Form: React.FunctionComponent<FormProps> = ({
  cancelBtnText = 'Cancel',
  children,
  disabled = false,
  error,
  onCancel,
  onSubmit,
  submitBtnText = 'Submit',
  submitDisabled = false,
  title = '',
}) => (
  <div className={styles.form}>
    {title && <h3 className={styles.title}>{title}</h3>}
    {error && <Alert message={error} type={AlertType.danger} />}
    <form onSubmit={onSubmit} noValidate={true}>
      {children}

      <ButtonRow>
        {onCancel && (
          <Button onClick={onCancel} type={ButtonType.Light}>
            {cancelBtnText}
          </Button>
        )}

        <Button
          disabled={submitDisabled || disabled}
          isSubmitBtn={true}
          onClick={onSubmit}
          type={ButtonType.Success}
        >
          {submitBtnText}
        </Button>
      </ButtonRow>
    </form>
  </div>
)

export default React.memo(Form)
