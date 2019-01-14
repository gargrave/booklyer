import { Author } from 'app/authors/authors.types'
import { Resource, Timestamped } from 'app/core/types'

export type Book = {
  author: Author
  sortBy: string
  title: string
} & Resource &
  Timestamped

export type BooksReduxProps = {
  fetchBooks: () => Promise<Book[]>
  getBooks: () => Book[]
}
