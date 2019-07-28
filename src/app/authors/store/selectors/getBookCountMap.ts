import { createSelector } from 'reselect'

import { AppState } from 'store/reducers'
import { BooksState } from '../../../books/store/books.reducer'

const getBooksState = (state: AppState): BooksState => state.books

/**
 * Returns a map of ([authorId]: number) entries specifying the number of books
 * by each author currently in the store.
 *
 * The final map will look something like:
 * {
 *   [authorId1]: 1,
 *   [authorId2]: 3,
 * }
 *
 * Note that this is primarily for use in chaining with other selectors, so that
 * the book counting process can be properly memoized without concerning itself
 * with other arguments (e.g. a specific author ID).
 */
export const getBookCountMap = createSelector(
  getBooksState,
  booksState => {
    const books = booksState.data
    const map = {}

    Object.values(books).forEach(({ authorId }) => {
      const prevValue = map[authorId] || 0
      map[authorId] = prevValue + 1
    })

    return map
  },
)
