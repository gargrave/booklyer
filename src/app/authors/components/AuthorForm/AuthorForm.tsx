import * as React from 'react'

import { authorFormFields } from 'app/authors/authors.types'

import ManagedForm, {
  ManagedFormState,
} from 'app/common/forms/ManagedForm/ManagedForm'

export type AuthorFormProps = {
  error?: string
  onSubmit: (payload: ManagedFormState) => void
}

const AuthorForm: React.FunctionComponent<AuthorFormProps> = ({
  error,
  onSubmit,
}) => {
  return (
    <ManagedForm
      error={error}
      fields={authorFormFields}
      onSubmit={onSubmit}
      title="Add a New Author"
    />
  )
}

export default React.memo(AuthorForm)
