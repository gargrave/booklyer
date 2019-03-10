import * as React from 'react'

import { bookFormFields } from 'app/books/books.types'

import ManagedForm, {
  ManagedFormState,
} from 'app/common/forms/ManagedForm/ManagedForm'

export type BookFormProps = {
  error?: string
  onCancel: () => void
  onSubmit: (payload: ManagedFormState) => void
}

const BookForm: React.FunctionComponent<BookFormProps> = ({
  error,
  onCancel,
  onSubmit,
}) => {
  return (
    <ManagedForm
      error={error}
      fields={bookFormFields}
      onCancel={onCancel}
      onSubmit={onSubmit}
      title="Add a Book"
    />
  )
}

export default React.memo(BookForm)
