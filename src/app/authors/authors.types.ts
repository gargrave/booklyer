import {
  GenericResourcePropertyNames,
  Resource,
  Timestamped,
} from 'app/core/core.types'
import { ObjectIdMap } from 'utils/firestore.helpers'

import { InputType } from 'app/common/forms/forms.types'
import { FieldConfig } from 'app/common/forms/ManagedForm/ManagedForm'

/********************************************************
 * Base Author types
 *******************************************************/
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

/********************************************************
 * Redux & API Types
 *******************************************************/
export type AuthorIdMap = ObjectIdMap<Author>

export type AuthorBucket = {
  key: string
  values: Author[]
}

export type AuthorsReduxProps = {
  createAuthor: (ownerId: string, author: Author) => Promise<Author[]>
  deleteAuthor: (ownerId: string, author: Author) => Promise<void>
  fetchAuthors: (ownerId: string) => Promise<Author[]>
  getAuthorById: (id: string) => Author | undefined
  getAuthors: () => Author[]
  getBucketedAuthors: () => AuthorBucket[]
  getAuthorsRequestPending: () => boolean
  updateAuthor: (ownerId: string, author: Author) => Promise<Author[]>
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
