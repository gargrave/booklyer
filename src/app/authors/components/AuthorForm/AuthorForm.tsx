import * as React from 'react'

import { authorFormFields } from 'app/authors/authors.types'

import { OptionalFormProps } from 'app/common/forms/Form/Form'
import ManagedForm, {
  ManagedFormState,
} from 'app/common/forms/ManagedForm/ManagedForm'
import Loader from 'app/common/Loader/Loader'

export type AuthorFormProps = {
  error?: string
  onCancel: () => void
  onSubmit: (payload: ManagedFormState) => void
} & OptionalFormProps

const AuthorForm: React.FunctionComponent<AuthorFormProps> = ({
  error,
  onCancel,
  onSubmit,
  ...passThruProps
}) => {
  const renderLoader = React.useCallback(() => <Loader size={44} />, [])
  return (
    <ManagedForm
      {...passThruProps}
      error={error}
      fields={authorFormFields}
      onCancel={onCancel}
      onSubmit={onSubmit}
      renderLoader={renderLoader}
      title="Add an Author"
    />
  )
}

export default React.memo(AuthorForm)
