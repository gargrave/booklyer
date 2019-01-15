import { Author } from 'app/authors/authors.types'
import { Resource, Timestamped } from 'app/core/types'
import { ObjectIdMap } from 'utils/firestore.helpers'

export type Book = {
  author: Author
  sortBy: string
  title: string
} & Resource &
  Timestamped

export type BookIdMap = ObjectIdMap<Book>

export type BooksReduxProps = {
  fetchBooks: () => Promise<Book[]>
  getBooks: () => Book[]
}
