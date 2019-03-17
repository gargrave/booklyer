import { Author } from 'app/authors/authors.types'
import {
  GenericResourcePropertyNames,
  Resource,
  Timestamped,
} from 'app/core/core.types'
import { ObjectIdMap } from 'utils/firestore.helpers'

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
  getAuthors: () => Author[]
  getBooks: () => Book[]
  getBooksRequestPending: () => boolean
}
