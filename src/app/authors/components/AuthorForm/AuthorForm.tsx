import * as React from 'react'

import { authorFormFields } from '../../authors.types'

import { OptionalFormProps } from 'packages/common/src/forms/Form/Form'
import ManagedForm, {
  ManagedFormState,
} from 'packages/common/src/forms/ManagedForm/ManagedForm'
import { Loader } from 'app/core/components'

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
    />
  )
}

export default React.memo(AuthorForm)
