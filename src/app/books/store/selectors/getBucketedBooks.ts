import { createSelector } from 'reselect'

import { bucketizer } from 'utils/bucketizer'
import { Book } from '../../books.types'
import { getBooks } from './getBooks'
import { sortByCustomOrTitle } from './utils'

const sortByAuthor = (a: Book, b: Book) =>
  a.author.lastName > b.author.lastName ? 1 : -1

export function bookBucketizer(
  values: Book[],
  preSortValues: (a, b) => -1 | 0 | 1,
  getBucketKey: (value) => string,
) {
  // use default bucketizer to get single-level bucketing
  const bucketed = bucketizer<Book>(values, preSortValues, getBucketKey)
  // expand bucketing to account for "sortBy" field on books, as these books should be sorted relative to one-another
  bucketed.forEach(({ values }) => {
    values.sort(sortByCustomOrTitle)
  })
  return bucketed
}

export const getBucketedBooks = createSelector(
  getBooks,
  books =>
    bookBucketizer(
      books,
      sortByAuthor,
      (book: Book) => `${book.author.firstName} ${book.author.lastName}`,
    ),
)
