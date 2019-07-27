import * as React from 'react'

import { Author } from 'app/authors/authors.types'

import {
  FieldConfig,
  InputType,
  ManagedForm,
  ManagedFormState,
  OptionalFormProps,
} from 'packages/common'
import { Loader } from 'app/core/components'

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
  ...passThruProps
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

  const renderLoader = React.useCallback(() => <Loader size={44} />, [])

  return (
    <ManagedForm
      {...passThruProps}
      disabled={disabled}
      error={error}
      fields={fields}
      onCancel={onCancel}
      onSubmit={onSubmit}
      renderLoader={renderLoader}
    />
  )
}

export default React.memo(BookForm)
