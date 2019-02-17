import { createSelector } from 'reselect'
import pick from 'lodash/pick'

import { AppState } from 'store/reducers'
import { Book, BookPropertyNames } from '../../books.types'

import { getAuthorById, getAuthors } from '../../../authors/store/selectors'

const rawGetBooksWithAuthors = (state: AppState): Book[] =>
  Object.values(state.books.data).map(book => {
    const author = getAuthorById(state.authors, book.authorId)
    return {
      ...pick(book, BookPropertyNames),
      author,
    }
  })

// TODO: this is not an actual selector, as it still relies on the messy selector above
// fix this to properly use reselect to make a proper selector
// (may require changing the state that is passed in)
const getBooksWithAuthors = createSelector(
  rawGetBooksWithAuthors,
  books => books,
)

export default getBooksWithAuthors
