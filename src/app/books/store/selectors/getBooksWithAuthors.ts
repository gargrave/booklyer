import { createSelector } from 'reselect'
import pick from 'lodash/pick'

import { AppState } from 'store/reducers'
import { Book, BookPropertyNames } from '../../books.types'

import { getAuthorById } from '../../../authors/store/selectors'

const rawGetBooksWithAuthors = (state: AppState): Book[] =>
  Object.values(state.books.data).map(book => {
    const author = getAuthorById(state, book.authorId)
    return {
      ...pick(book, BookPropertyNames),
      author,
    }
  })

const getBooksWithAuthors = createSelector(
  rawGetBooksWithAuthors,
  books => books,
)

export default getBooksWithAuthors
