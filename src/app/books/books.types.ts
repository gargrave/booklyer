import { Author } from 'app/authors/authors.types'
import {
  GenericResourcePropertyNames,
  Resource,
  Timestamped,
} from 'app/core/core.types'
import { ObjectIdMap } from 'utils/firestore.helpers'

import { InputFieldType } from 'app/common/forms/InputField/InputField'
import { FieldConfig } from 'app/common/forms/ManagedForm/ManagedForm'

export const BookPropertyNames = [
  ...GenericResourcePropertyNames,
  'sortBy',
  'title',
]

export type Book = {
  author: Author
  authorId?: string
  sortBy: string
  title: string
} & Resource &
  Timestamped

export type BookIdMap = ObjectIdMap<Book>

export type BooksReduxProps = {
  createBook: (ownerId: string, book: Book) => Promise<Book[]>
  fetchBooks: (ownerId: string) => Promise<Book[]>
  getBooks: () => Book[]
}

export const bookFormFields: FieldConfig[] = Object.freeze([
  {
    label: 'Title',
    name: 'title',
    required: true,
    type: InputFieldType.text,
  },
  {
    label: 'Sort By',
    name: 'sortBy',
    type: InputFieldType.text,
  },
]) as FieldConfig[]
