import { Author } from 'app/authors/authors.types'
import {
  GenericResourcePropertyNames,
  Resource,
  Timestamped,
} from 'app/core/core.types'
import { ObjectIdMap } from 'utils/firestore.helpers'

/********************************************************
 * Base Book types
 *******************************************************/
export const BookPropertyNames = [
  ...GenericResourcePropertyNames,
  'sortBy',
  'title',
]

export type Book = {
  author: Author
  authorId: string
  sortBy: string
  title: string
} & Resource &
  Timestamped

/********************************************************
 * Redux & API Types
 *******************************************************/
export type BookIdMap = ObjectIdMap<Book>

export type BookBucket = {
  key: string
  values: Book[]
}
