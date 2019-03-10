import {
  GenericResourcePropertyNames,
  Resource,
  Timestamped,
} from 'app/core/core.types'
import { ObjectIdMap } from 'utils/firestore.helpers'

import { InputType } from 'app/common/forms/forms.types'
import { FieldConfig } from 'app/common/forms/ManagedForm/ManagedForm'

export const AuthorPropertyNames = [
  ...GenericResourcePropertyNames,
  'firstName',
  'lastName',
]

export type Author = {
  firstName: string
  lastName: string
} & Resource &
  Timestamped

export type AuthorIdMap = ObjectIdMap<Author>

export type AuthorsReduxProps = {
  createAuthor: (ownerId: string, author: Author) => Promise<Author[]>
  fetchAuthors: (ownerId: string) => Promise<Author[]>
  getAuthors: () => Author[]
}

export const authorFormFields: FieldConfig[] = Object.freeze([
  {
    label: 'First Name',
    name: 'firstName',
    required: true,
    type: InputType.text,
  },
  {
    label: 'Last Name',
    name: 'lastName',
    type: InputType.text,
  },
]) as FieldConfig[]
