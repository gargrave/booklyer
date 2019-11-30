import { Book } from 'app/books/books.types'
import {
  GenericResourcePropertyNames,
  Resource,
  Timestamped,
} from 'app/core/core.types'
import { ObjectIdMap } from 'utils/firestore.helpers'

import { FieldConfig, InputType } from 'packages/common'

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

export type AuthorsSelectors = {
  getAuthorById: (id: string) => Author | undefined
  getAuthors: () => Author[]
  getAuthorsRequestPending: () => boolean
  // getBookCountByAuthor: (authorId: string) => number
  getBooksByAuthor: (authorId: string) => Book[]
}

export type AuthorsActions = {
  createAuthor: (ownerId: string, author: Author) => Promise<Author[]>
  deleteAuthor: (ownerId: string, author: Author) => Promise<void>
  fetchAuthors: (ownerId: string) => Promise<Author[]>
  updateAuthor: (ownerId: string, author: Author) => Promise<Author[]>
}

export type AuthorsReduxProps = AuthorsSelectors & AuthorsActions

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
