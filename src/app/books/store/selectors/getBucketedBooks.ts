import { createSelector } from 'reselect'

import { bucketizer } from 'utils/bucketizer'
import { Book } from '../../books.types'
import { getBooks } from './getBooks'
import { sanitizeTitle } from './utils'

type BookSubBucket = {
  sorted: Book[]
  unsorted: Book[]
}

const sortByField = (field: string) => (a: Book, b: Book) =>
  sanitizeTitle(a[field]) > sanitizeTitle(b[field]) ? 1 : -1

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
  bucketed.forEach((bucket, idx) => {
    const subBuckets = bucket.values.reduce(
      (acc, book): BookSubBucket => {
        const key = !!book.sortBy ? 'sorted' : 'unsorted'
        return {
          ...acc,
          [key]: acc[key].concat(book),
        }
      },
      { sorted: [] as Book[], unsorted: [] as Book[] },
    )

    // just directly overwrite the existing values on this bucket
    bucketed[idx].values = [
      ...subBuckets.unsorted.sort(sortByField('title')),
      ...subBuckets.sorted.sort(sortByField('sortBy')),
    ]
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
