import { createSelector } from 'reselect'

import { bucketizer } from 'utils/bucketizer'
import { Book } from '../../books.types'

import getBooksWithAuthors from './getBooksWithAuthors'

const sortByAuthor = (a: Book, b: Book) => (a.title > b.title ? 1 : -1)

const getBucketedBooks = createSelector(
  getBooksWithAuthors,
  books =>
    bucketizer<Book>(
      books,
      sortByAuthor,
      (book: Book) => `${book.author.firstName} ${book.author.lastName}`,
    ),
)

export default getBucketedBooks
