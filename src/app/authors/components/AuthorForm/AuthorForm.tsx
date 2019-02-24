import * as React from 'react'

import { authorFormFields } from 'app/authors/authors.types'

import ManagedForm, {
  ManagedFormState,
} from 'app/common/forms/ManagedForm/ManagedForm'

export type AuthorFormProps = {
  error?: string
  onCancel: () => void
  onSubmit: (payload: ManagedFormState) => void
}

const AuthorForm: React.FunctionComponent<AuthorFormProps> = ({
  error,
  onCancel,
  onSubmit,
}) => {
  return (
    <ManagedForm
      error={error}
      fields={authorFormFields}
      onCancel={onCancel}
      onSubmit={onSubmit}
      title="Add an Author"
    />
  )
}

export default React.memo(AuthorForm)
