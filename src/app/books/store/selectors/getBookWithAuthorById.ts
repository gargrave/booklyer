import { createSelector } from 'reselect'
import pick from 'lodash/pick'

import { AppState } from 'store/reducers'
import { Book, BookPropertyNames } from '../../books.types'

import { getAuthorById } from '../../../authors/store/selectors'

const rawGetBookById = (state: AppState, id?: string): Book | undefined => {
  if (!id) {
    return undefined
  }

  const book = state.books.data[id]
  if (!book) {
    return undefined
  }

  const author = getAuthorById(state, book.authorId)
  return {
    ...pick(book, BookPropertyNames),
    author,
  }
}

const getBookWithAuthorById = createSelector(
  rawGetBookById,
  book => book,
)

export default getBookWithAuthorById
