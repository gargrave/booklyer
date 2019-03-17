import * as React from 'react'

import { Author } from 'app/authors/authors.types'
import ManagedForm, {
  FieldConfig,
  ManagedFormState,
} from 'app/common/forms/ManagedForm/ManagedForm'
import { InputType } from 'app/common/forms/forms.types'
import { OptionalFormProps } from 'app/common/forms/Form/Form'

export type BookFormProps = {
  authors: Author[]
  error?: string
  onCancel: () => void
  onSubmit: (payload: ManagedFormState) => void
} & OptionalFormProps

const BookForm: React.FunctionComponent<BookFormProps> = ({
  authors,
  disabled,
  error,
  onCancel,
  onSubmit,
}) => {
  const fields: FieldConfig[] = React.useMemo(
    () =>
      [
        {
          label: 'Title',
          name: 'title',
          required: true,
          type: InputType.text,
        },
        {
          label: 'Author',
          name: 'author',
          placeholder: 'Select an author...',
          required: true,
          selectConfig: {
            getOptionText: (author: Author) =>
              `${author.firstName} ${author.lastName}`,
            getOptionValue: (author: Author) => author.id,
            options: authors,
          },
          type: InputType.select,
        },
        {
          label: 'Sort By',
          name: 'sortBy',
          type: InputType.text,
        },
      ] as FieldConfig[],
    [authors],
  )

  return (
    <ManagedForm
      disabled={disabled}
      error={error}
      fields={fields}
      onCancel={onCancel}
      onSubmit={onSubmit}
      title="Add a Book"
    />
  )
}

export default React.memo(BookForm)
